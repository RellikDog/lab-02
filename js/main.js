'use strict';
//render pics to page
const hornsGallery = [];
const keywords = [];
const keywordsFinal = [];
// let getArray = [];
// let removeDupl = [];
// const lim = removeDupl.length;
// let hornsImg;
//
function Horns(obj) {
  this.title = obj.title;
  this.image_url = obj.image_url;
  this.description = obj.description;
  this.keyword = obj.keyword;
  hornsGallery.push(this);
  keywords.push(this.keyword);
  // keywordsFinal.push([ ...new Set(keywords)]);
  // localStorage.setItem('keys', JSON.stringify(keywordsFinal));
}
Horns.prototype.render = function() {
  $('main').append('<div class="clone"></div>');
  let $clone = $('div[class="clone"]');
  let hornsTemplate = $('#photo-template').html();
  $clone.html(hornsTemplate);
  $clone.find('h2').text(this.title);
  $clone.find('p').text(this.description);
  $clone.find('img').attr('src', this.image_url);
  $clone.removeClass('clone');
  $clone.attr('class', this.keyword);
}
function readJson () {
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(hornsObj => {
        new Horns(hornsObj);
      })
    })
    .then(function() {
      hornsGallery.forEach(horns =>{
        horns.render();
      })
      popFilter2();
    })
}
$(() => readJson());
//
const popFilter2 = function(){
  for(var i = 0; i < keywords.length; i++){
    if(keywordsFinal.indexOf(keywords[i])=== -1){
      keywordsFinal.push(keywords[i]);
    }
  }
  for(let i in keywordsFinal){
    $('.dropdown-menu').append(`<option value="${keywordsFinal[i]}">${keywordsFinal[i]}</option>`);
  }
}
;
//selecting box filtering
$('select[name="horn-picks"]').on('change', function() {
  if($(this).val() === 'default'){
    $('main div').show()
  } else{
    let $selection = $(this).val();
    $('main div').hide()
    $(`div[class="${$selection}"]`).show()
    console.log($(this).val())
  }
})
//lorins solution to dynamic keywords
var names = ['Mike','Matt','Nancy','Adam','Jenny','Nancy','Carl'];
var uniqueNames = [];
$.each(names, function(i, el){
  if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
});

// popFilter2();

// const popFilter = function() {
//   getArray = JSON.parse(localStorage.getItem('keys'));
//   $.each(getArray, function(index, element){ //From stack overflow
//     if($.inArray(element, removeDupl) === -1) removeDupl.push(element);
//   });
//   removeDupl = removeDupl[19];
//   for(let i in removeDupl) {
//     $('.dropdown-menu').append( '<option value="'+removeDupl[i]+'">'+removeDupl[i]+'</option>' );
//   }
// }
// getArray = JSON.parse(localStorage.getItem('keys'));
// popFilter()

