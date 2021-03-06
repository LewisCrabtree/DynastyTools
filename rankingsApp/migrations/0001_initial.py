# Generated by Django 3.1.7 on 2021-12-30 04:44

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=255)),
                ('Team', models.CharField(default='N/A', max_length=5)),
                ('Position', models.CharField(max_length=3)),
                ('Age', models.FloatField(default=200)),
                ('Birthdate', models.CharField(default=1900, max_length=10)),
                ('Draftyear', models.CharField(default=1900, max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Username', models.CharField(max_length=32)),
            ],
        ),
        migrations.CreateModel(
            name='Ranking',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Rating', models.FloatField(default=1500)),
                ('Deviation', models.FloatField(default=500)),
                ('Volatility', models.FloatField(default=0.1)),
                ('Player', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rankingsApp.player')),
                ('User', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rankingsApp.user')),
            ],
        ),
        migrations.CreateModel(
            name='Matchup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Result', models.BooleanField()),
                ('ComparisonDatetime', models.DateTimeField(default=django.utils.timezone.now)),
                ('Ranking1', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Ranking1', to='rankingsApp.ranking')),
                ('Ranking2', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Ranking2', to='rankingsApp.ranking')),
            ],
        ),
    ]
