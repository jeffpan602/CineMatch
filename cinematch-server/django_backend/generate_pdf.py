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

for movie in watched:
    # Retrieve runtime info from TMDB API using movie_id
    response = requests.get(
        f'https://api.themoviedb.org/3/movie/{movie["movie_id"]}?api_key=b5d2f69cf0491ce4441c4d04c4befc3d&language=en-US')
    movie_info = response.json()
    runtime = movie_info['runtime']
    total_watch_time += runtime


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


# Build PDF document
doc.build(elements)
