import { Tamagotchi } from './tamagotchi';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'
import Tama from './img/tama.jpg';

let tama = document.getElementById('tama');
tama.src = Tama;

$(document).ready(function() {
  let tamagotchi;
  $("form.pet-name").submit(function(event) {
    event.preventDefault();
    let name = $("input.name").val();
    tamagotchi = new Tamagotchi(name);
    $("form.pet-name").hide();
    $(".name-of-pet").text(name);
    AttributeTracker(tamagotchi);
    $(".buttons").show();
    $(".tama").show();
  });

  $("button#pet").click(function() {
    tamagotchi.Pet();
  });

  $("button#feed").click(function() {
    tamagotchi.Feed();
  });

  $("button#poopscoop").click(function() {
    tamagotchi.PoopScoop();
  });

  function AttributeTracker(tamagotchi) {
    let timer = setInterval(() => {
      $("#happiness").text(tamagotchi.happiness);
      $("#energy").text(tamagotchi.energy);
      $("#food").text(tamagotchi.food);
      $("#numberOfPoops").text(tamagotchi.numberOfPoops);

      // function dyingLogic() {
        // $(".dead").text(tamagotchi.name + tamagotchi.IsDead())
        if(tamagotchi.IsDead() === `${tamagotchi.name} DIED OF SADNESS!` || tamagotchi.IsDead() === `${tamagotchi.name} DROWNED IN POOP!` || tamagotchi.IsDead() === `${tamagotchi.name} STARVED`) {
          $(".buttons").hide();
          $(".tama").hide();
          $("form.pet-name").show();
          $(".dead").text(tamagotchi.IsDead())
          clearInterval(timer);
          DeadGif();
        }

        function DeadGif(deathcause){
          $.ajax({
            url: `https://api.giphy.com/v1/gifs/random?api_key=${process.env.API_KEY}&tag=${deathcause}&rating=PG-13`,
            type: 'GET',
            data: {
              format: 'json'
            },
            success: function(response) {
              $('.gif').html(`<img src="${response.data.images.original.url}">`);
              $(".gif").show();
            },
            error: function() {
              $('#errors').text("There was an error processing your request. Please try again.");
            },
          });
        }

      //}
      // IsDead = "${tamagotchi.name} DIED OF SADNESS!"

      // if(tamagotchi.IsDead() === " DIED OF SADNESS!") {
      //   tamagotchi.DeadGif("sadness");
      //   dyingLogic();
      // }
      // else if(tamagotchi.IsDead() === " DROWNED IN POOP!"){
      //   tamagotchi.DeadGif("poop");
      //   dyingLogic();
      // }
      // else if(tamagotchi.IsDead() === " STARVED!") {
      //   tamagotchi.DeadGif("starved");
      //   dyingLogic();
      // }
    }, 1000);

  }



});
