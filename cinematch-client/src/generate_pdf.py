import os
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
    # Retrieve movie info
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

    # Get languages and their counts
    language_counts = {}
    for movie in watched:
        language = movie_info['original_language']
        if language in language_counts:
            language_counts[language] += 1
        else:
            language_counts[language] = 1

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


# Create a list of labels and sizes for the first pie chart
labels = [genre[0] for genre in top_genres]
sizes = [genre[1] for genre in top_genres]

# Create the first pie chart with percentages
fig1, ax1 = plt.subplots()
ax1.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=90)
ax1.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle.
plt.savefig('top_genres_pie_chart.png')  # Save first pie chart to file

# Add first pie chart to PDF
pie_chart1 = Image('top_genres_pie_chart.png', width=4*inch, height=3*inch)
elements.append(pie_chart1)

# Generate the second pie chart
labelsLang = list(language_counts.keys())
counts = list(language_counts.values())
colors = ['gold', 'yellowgreen', 'lightcoral', 'lightskyblue']
fig2, ax2 = plt.subplots()  # Create a new figure and axis for the second pie chart
ax2.pie(counts, labels=labelsLang, colors=colors,
        autopct='%1.1f%%', startangle=140)
ax2.axis('equal')

plt.savefig('language_pie_chart.png')  # Save second pie chart to file

elements.append(
    Paragraph(f"Movie Language Distrubution:", styles['Normal']))

# Add second pie chart to PDF
pie_chart2 = Image('language_pie_chart.png', width=4*inch, height=3*inch)
elements.append(pie_chart2)


# Build PDF document
doc.build(elements)


# Get the root directory of the project
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Define the relative path to the PDF file
pdf_file = os.path.join(BASE_DIR, 'cinematch-server',
                        'django_backend', 'movie_stats.pdf')

# Define PDF document layout
doc = SimpleDocTemplate(pdf_file, pagesize=letter)
