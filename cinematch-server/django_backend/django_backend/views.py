import subprocess
from django.http import HttpResponse


def generate_pdf(request):
    subprocess.call(['python', 'generate_pdf.py'])
    return HttpResponse('PDF generated!')
