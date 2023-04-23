import matplotlib.pyplot as plt
from django.db.models import Count
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Paragraph, Table, TableStyle, Spacer, Image
import requests

# Fetch data from backend API
response = requests.get('http://127.0.0.1:8000/api/watched/')
watched = response.json()

# Process data to generate stats
total_watch_time = 0
total_movies_watched = len(watched)

# Get genres with API call to TMDB
genres_response = requests.get(
    'https://api.themoviedb.org/3/genre/movie/list?api_key=b5d2f69cf0491ce4441c4d04c4befc3d&language=en-US')
genres_dict = {genre['id']: genre['name']
               for genre in genres_response.json()['genres']}
genre_counts = {}

for movie in watched:
    # Retrieve runtime and genre info from TMDB API using movie_id
    response = requests.get(
        f'https://api.themoviedb.org/3/movie/{movie["movie_id"]}?api_key=b5d2f69cf0491ce4441c4d04c4befc3d&language=en-US')
    movie_info = response.json()
    runtime = movie_info['runtime']
    total_watch_time += runtime

    genre_ids = movie_info['genres']
    for genre in genre_ids:
        genre_id = genre['id']
        genre_name = genres_dict.get(genre_id)
        genre_counts[genre_name] = genre_counts.get(genre_name, 0) + 1

# Get top 5 genres
top_genres = sorted(genre_counts.items(), key=lambda x: x[1], reverse=True)[:5]
top_genres_str = ', '.join(
    [f"{genre[0]} ({genre[1]})" for genre in top_genres])


# Define PDF document layout
doc = SimpleDocTemplate("movie_stats.pdf", pagesize=letter)
styles = getSampleStyleSheet()
elements = []

# Add title
elements.append(Paragraph("Movie Stats", styles['Title']))

# Add total watch time
elements.append(
    Paragraph(f"Total Watch Time: {total_watch_time} minutes", styles['Normal']))

# Add some whitespace
whitespace = Spacer(0, 10)  # 10 points of space
elements.append(whitespace)

# Add total number of movies watched
elements.append(
    Paragraph(f"Total Number of Movies Watched: {total_movies_watched}", styles['Normal']))

# Add some whitespace
whitespace = Spacer(0, 10)  # 10 points of space
elements.append(whitespace)

# Add top genres
elements.append(
    Paragraph(f"Movie Genres Distrubution:", styles['Normal']))


# Create a list of labels and sizes for the pie chart
labels = [genre[0] for genre in top_genres]
sizes = [genre[1] for genre in top_genres]

# Create the pie chart with percentages
fig, ax = plt.subplots()
ax.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=90)
ax.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle.
plt.savefig('top_genres_pie_chart.png')  # Save pie chart to file


# Add title
plt.title("Top Genres")

# Add pie chart to PDF
pie_chart = Image('top_genres_pie_chart.png', width=4*inch, height=3*inch)
elements.append(pie_chart)

# Build PDF document
doc.build(elements)
