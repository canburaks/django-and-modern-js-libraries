# items.models
from django.db import models
 
class Movie(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    year = models.IntegerField(null=True)
    summary = models.TextField(max_length=5000,null=True)
    poster_url = models.URLField(blank=True, null=True)
    slug = models.SlugField(max_length=50, null=True,blank =True, unique=True)
 
    # order items in descending order
    class Meta:
        ordering = ["-year"]
 
    # the method which defines string output of class
    def __str__(self):
        return self.name
        
    # the method which loads initial data
    @classmethod
    def import_records(cls, record_list):
        for record in record_list:
            # create record if id is not exist
            if not cls.objects.filter(id=record.get("id")).exists():
                new_movie = cls.objects.create(**record)
            else:
                print(f"Id:{record.get('id')} is already exist.")
        print("Import operation done successfully")