'use strict';

//getting data from file
// $.get('data/page-1.json').then(data => console.log( 'Data Loaded: ' + data ));
// $.get('data/page-1.json', function( data ) {
//   console.log( 'Data Loaded: ' + data );
// });
// $.get('data/page-1.json').then(data =>
//   data.forEach(element => {
//     console.log(element.title);
//   })
// );
//
const allHorns = [];
function Horn(data){
  this.title = data.title;
  this.image_url = data.image_url;
  this.description = data.decription;
  this.horns = data.horns;
  this.keyword = data.keyword;
  allHorns.push(this);
}

Horn.prototype.print = function(){
  $('main').append('<div class="clone"></div>');
  let $clone = $('div[class="clone"]');

  let hornTemp = $('#photo-template').html();

  $clone.html(hornTemp);

  $clone.find('h1').text(this.title);
  $clone.find('p').text(this.description);
  $clone.find('img').attr('src', this.image_url);

  $clone.removeClass('clone');
  $clone.attr('class', this.title);
}

const getData = function () {
  $.get('data/page-1.json').then(data =>
    data.forEach(element => {new Horn(element)}).then(()=>
      allHorns.forEach(element => element.print())
    )

  );
};
//getData();

function readJson () {
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(hornObj => {
        new Horn(hornObj);
      })
    })
    .then(function() {
      allHorns.forEach(horn =>{
        horn.print();
      })
    })
}
readJson();

// const testTest = function () {
//     $.get('data/page-1.json').then(data =>
//       data.forEach(element => {$('#photo-template').after('<img src="'element.url_image'">')}));

//     };
//     testTest();
//render pics to page




//add button to hide all pics but ones with selected data types
