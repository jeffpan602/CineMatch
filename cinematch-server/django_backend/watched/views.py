from reportlab.pdfgen import canvas
from datetime import datetime
from reportlab.lib.utils import ImageReader
from django.shortcuts import render
from rest_framework import viewsets
from .serializers import watchedSerializer
from .models import watched

# Create your views here.


class watchedView(viewsets.ModelViewSet):
    serializer_class = watchedSerializer
    queryset = watched.objects.all()


...


def pdf_dw(request):

    # Create the HttpResponse object
    response = HttpResponse(content_type='application/pdf')

    # This line force a download
    response['Content-Disposition'] = 'attachment; filename="1.pdf"'

    # READ Optional GET param
    get_param = request.GET.get('name', 'World')

    # Generate unique timestamp
    ts = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S.%f')

    p = canvas.Canvas(response)

    # Write content on the PDF
    p.drawString(100, 500, "Hello " + get_param + " (Dynamic PDF) - " + ts)

    # Close the PDF object.
    p.showPage()
    p.save()

    # Show the result to the user
    return response
