from django.contrib import admin
from .models import watched


class watchedAdmin(admin.ModelAdmin):
    list_display = ('movie_id', 'rating', 'review')

# Register your models here.


admin.site.register(watched, watchedAdmin)
