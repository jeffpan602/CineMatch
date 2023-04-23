from django.db.models import Count
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Paragraph, Table, TableStyle, Spacer
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

# Add top genres
elements.append(
    Paragraph(f"Top Genres: {top_genres_str}", styles['Normal']))


# Build PDF document
doc.build(elements)
