from django.contrib import admin
from .models import to_watch


class to_watchAdmin(admin.ModelAdmin):
    list_display = ('movie_id', 'movie_title', 'completed')

# Register your models here.


admin.site.register(to_watch, to_watchAdmin)
