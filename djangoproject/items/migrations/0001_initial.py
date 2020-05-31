# Generated by Django 3.0.6 on 2020-05-31 21:19

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('year', models.IntegerField(null=True)),
                ('summary', models.TextField(max_length=5000, null=True)),
                ('poster_url', models.URLField(blank=True, null=True)),
                ('slug', models.SlugField(blank=True, null=True, unique=True)),
            ],
            options={
                'ordering': ['-year'],
            },
        ),
    ]
