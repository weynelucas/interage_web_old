from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required
def index(request):
    return render(request, "interactions/index.html")

@login_required
def single(request):
    return render(request, "interactions/single.html")
