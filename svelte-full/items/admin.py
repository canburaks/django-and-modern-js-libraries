from django.contrib import admin
from items.models import Page

@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ("name", )
    #resource_class = TagResource