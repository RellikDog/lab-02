'use strict';

// //getting data from file
// $.get("data/page-1.json").then(data => {});

console.log('test');

//render pics to page
const hornsGallery = [];

function horns(obj) {
    this.title = obj.title;
    this.image_url = obj.image_url;
    this.description = obj.description;

    hornsGallery.push(this);
}

    horns.prototype.render = function() {

    $('main').append('<div class="clone"></div>');
    let $clone = $('div[class="clone"]');
    let hornsTemplate = $('#photo-template').html();
    $clone.html(hornsTemplate);
    $clone.find('h1').text(this.title);
    $clone.find('p').text(this.description);
    $clone.find('img').attr('src', this.image_url);
    $clone.removeClass('clone');
    $clone.attr('class', this.title);  
  
  }


  function readJson () {

    $.get('data/page-1.json', 'json')
  
      .then(data => {
      data.forEach(hornsObj => {
        new horns(hornsObj);
        })
    })
  
      .then(function() {
      hornsGallery.forEach(horns =>{
      horns.render();
  
        })
  
      })
  }
   
  $(() => readJson());


//add button to hide all pics but ones with selected data types