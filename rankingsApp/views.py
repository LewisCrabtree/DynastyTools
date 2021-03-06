from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.views import View
import logging
import os
from .models import *
from django.shortcuts import render
import io,csv

class ReactAppView(View):
    index_file_path = os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')
    def get(self, request):
        try:
            with open(self.index_file_path) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            logging.exception('Production build of app not found')
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead after
                running `npm start` on the frontend/ directory
                """,
                status=501,
            )


class UploadView(View):
    def get(self, request):
        if 'isAdmin' not in request.session or request.session['isAdmin'] is False:
            return render(request, 'admin.html')
        else:
            return render(request, 'admin.html')

    def post(self, request):
        #date_patterns = ["%m/%d/%Y"]
        try:
            Player.objects.all().delete()
            Ranking.objects.all().delete()

            globalUser, result = User.objects.get_or_create(Username='Global')

            playerFile = io.TextIOWrapper(request.FILES['players'].file)
            playerDict = csv.DictReader(playerFile)
            playerList = list(playerDict)
            
            for row in playerList:
                
                newPlayer, _ = Player.objects.get_or_create(
                    Name = row['Name'],
                    Team = row['Team'],
                    Position = row['Position'],
                    Age = row['Age'],
                    Birthdate = row['Birthdate'],
                    Draftyear = row['Draftyear']
                )

                Ranking(
                    User = globalUser,
                    Player = newPlayer,
                    Rating = row['Rating']
                ).save()

            returnmsg = {"status_code": 200}
            print('import successful')
        except Exception as e:
            print(e)
            returnmsg = {'status_code': 500}

        return JsonResponse(returnmsg)
