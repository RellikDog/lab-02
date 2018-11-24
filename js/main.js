'use strict';

//render pics to page
const hornsGallery = [];
const keywords = [];
const keywordsFinal = [];
let getArray = []; //For filtering array of keywords 
let removeDupl = [];//For removing duplicates
let hornsImg;

function horns(obj) {
  this.title = obj.title;
  this.image_url = obj.image_url;
  this.description = obj.description;
  this.keyword = obj.keyword;

  hornsGallery.push(this);
  keywords.push(obj.keyword); // Array for keywords
  keywordsFinal.push([ ...new Set(keywords)]); //First step in removing duplicates from object
  localStorage.setItem('keys', JSON.stringify(keywordsFinal)); //To remember keyword items
}
horns.prototype.render = function() {

  $('main').append('<div class="clone"></div>');
  let $clone = $('div[class="clone"]');
  let hornsTemplate = $('#photo-template').html();
  $clone.html(hornsTemplate);
  $clone.find('h2').text(this.title);
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

    hornsGallery.forEach(horns => {
  
        })
      })
  
    })
  }
   
  $(() => readJson());

  for(let i in keywords) {

  }
  
const popFilter = function() {
  getArray = JSON.parse(localStorage.getItem('keys'));
  $.each(getArray, function(index, element){ //From stack overflow
    if($.inArray(element, removeDupl) === -1) removeDupl.push(element); //Conditional for duplicate
  });
  removeDupl = removeDupl[19];
  for(let i in removeDupl)   {
  $('.dropdown-menu').append( '<option value="'+removeDupl[i]+'">'+removeDupl[i]+'</option>' );
      }
}
getArray = JSON.parse(localStorage.getItem('keys')); //Pulls array items in memory

//add button to hide all pics but ones with selected data types
popFilter();

//selecting box filtering
$('select[name="horn-picks"]').on('change', function() {
  let $selection = $(this).val();
  $('h2').hide()
  $('img').hide()
  $('p').hide()
  for(let i in hornsGallery) {
    if($('select').val() === hornsGallery[i].keyword) {
      hornsImg = hornsGallery[i].image_url;
    }
    $('main').append('<div class="clone"></div>');
    let $clone = $('div[class="clone"]');
    // $selection = $('select[name="horn-picks"]');
    $clone.find('img').attr('src', hornsImg);
    console.log(hornsImg)
  }
 
})

 

