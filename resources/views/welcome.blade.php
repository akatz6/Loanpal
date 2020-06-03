<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Loanpal</title>

    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('css/d3-tip.css') }}" rel="stylesheet">

    <script src="https://d3js.org/d3.v5.min.js"></script>
    <script src="http://d3js.org/topojson.v0.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    </script>
</head>

<body>
    <h1 class="center" >Customer that are deliquent for Loanpal</h1>
    <div class="center">
        <button onclick="reset()" type="button" name="button" class="btn btn-primary btn-lg">
            Reset
        </button>
    </div>
    <div class="container">
        <div class="row" class="contentDisplay">
            <div id="chart-area" class="topMargin center"></div>
        </div>
    </div>
    <div class="container">
        <h3 class="center">States with delinquent customers</h3>
        <p class="center">Click on a state that is not black to get information for that state</p>
        <div class="row" class="contentDisplay">
            <div id="map-area" class="topMargin center"></div>
        </div>
    </div>
    <script type="text/javascript">
        const loans = {!!$loans!!};
        const service = {!!$service!!};
    </script>
    <script src="{{ URL::to('js/d3-tip.js') }}"></script>
    <script src="{{ URL::to('js/methods.js') }}"></script>
    <script src="{{ URL::to('js/main.js') }}"></script>
    <script src="{{ URL::to('js/usa.js') }}"></script>

</html>
