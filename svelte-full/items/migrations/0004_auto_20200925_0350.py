# Generated by Django 3.0.7 on 2020-09-25 03:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('items', '0003_auto_20200925_0350'),
    ]

    operations = [
        migrations.AlterField(
            model_name='page',
            name='html',
            field=models.TextField(max_length=500000, null=True),
        ),
    ]
