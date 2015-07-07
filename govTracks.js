Recent = new Mongo.Collection("recent");

if (Meteor.isClient) {


  Meteor.subscribe("recent");
 var app = angular.module('app', ['ngStorage', 'angular-meteor']);
 app.factory('newService', function(){
  retainedData = [];

  return{
    getData: function(){
      return retainedData;
    },
    setData: function(newRetainedData){
      retainedData = newRetainedData
    },
    resetData: function(){
      retainedData = [];
    }
  };
 })
app.controller('mainCtrl', ['$scope', '$localStorage', '$timeout', '$meteor', 'newService', function($scope, $localStorage, $timeout, $meteor, newService){

$(document).ready(function(){
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
  });

$scope.$storage = $localStorage.$default({
  zip : '',
  hidden: true,
  recents: false,
  reset: false,
  money: false,
  entityTotal: [],
  entityType: [],
  contribNames:'',
  contribTotals:'',
  total: '',
  hmmP: '',
  name: '',
  state: '',
  contact:'',
  lasties: '',
  firsties: '',
  party:'',
  comitStuff: false,
  bill: [],
  billStuff: [],
  shortTitle: [],
  committees: [],
  partyClass:''

});
console.log($scope.$storage.zip);

var resetStuff = function(){
  $('.name').html('');
    $('.mainCommittee').html('');
    var firsties = '';
    var lasties = '';
    var party = '';
    var id = '';
    var contact = '';
    var bills = ''; 
    var shortTitle = '';
    var link = '';
    var committees= '';
    var newID = '';
    var totalP = '';
    var entityTotal= [];
    var entityType = [];
    var id;
    var lasties;
    var firsties;
    var contribNames = [];
    var contribTotals= [];
    var total = [];
    var contribName = '';
    var contribTotal = '';
    $scope.$storage.entityType = '';
    $scope.$storage.entityTotal = '';
    $scope.$storage.contribNames= '';
    $scope.$storage.contribTotals= '';
    $scope.$storage.bill = [];
    $scope.$storage.shortTitle = [];
    $scope.$storage.committees = [];
    $scope.$storage.billStuff = [];
    $scope.$storage.hmm ='';
    $scope.$storage.hmmP = '';
    $scope.$storage.money = false;
    $scope.$storage.bills = false;
    $scope.$storage.comitStuff = false;
    $scope.$storage.recents = false;
    $scope.$storage.reset= false;
    $scope.$storage.hidden = true;
    $scope.$storage.partyClass= '';
}

  $scope.search = function(){
    resetStuff();

    $scope.$storage.zip = $scope.zip;
    newService.getData();
  $scope.retainedData = retainedData;
    $scope.inputForm = false;
    $('.tabStuff').show();
    $scope.$storage.button = true;
    if(retainedData.length <1){
      $scope.$storage.recents = false;
    }
    else{
    $scope.$storage.recents = true;
    }
    var entityTotal= [];
    var entityType = [];
    var id;
    var lasties;
    var firsties;
     contribNames = [];
    var contribTotals= [];
    var total = []
    $scope.$storage.contribNames;
    $scope.$storage.contribTotals;
    $scope.total = total[0];
    $('.name').html('');
    $.getJSON("http://congress.api.sunlightfoundation.com/legislators/locate?zip="+$scope.zip+"&apikey=8b48c930d6bb4552be3b0e6248efb463").then(function (json){
      for(var i = 0; i< json.results.length; i++){
        if(json.results[i].chamber == "house"){
          var district = json.results[i].district;
          var firstName = json.results[i].first_name;
          var lastName = json.results[i].last_name;
          var state = json.results[i].state;
          var party = json.results[i].party;
        $('.name').append("<div> <button id = "+district+"> "+district+"</button> </td> <td> <h4>"+firstName+" "+lastName+ " ("+party+")</h4> </div>");
        $('#'+district).click(function(event){
          $scope.$storage.hidden = false;
          var newSearch = (event.target.id);
          $.getJSON('http://congress.api.sunlightfoundation.com/legislators?state='+state+'&district='+newSearch+'&apikey=8b48c930d6bb4552be3b0e6248efb463').then(function (json){
            var firsties = json.results[0].first_name;
            var lasties = json.results[0].last_name;
            console.log(party);
            if(party == 'R'){
            $scope.$storage.partyClass = "repub"
          }
          else{
            $scope.$storage.partyClass ="dem";
          }
            var id = json.results[0].bioguide_id;
            $timeout(function() {
                $scope.$storage.contact = json.results[0].contact_form;
                $scope.$storage.firsties =firsties;
                $scope.$storage.lasties= lasties;
                $scope.$storage.district=  newSearch;
                $scope.$storage.state= state;
                $scope.$storage.party = party;
              }, 1000);
            $('.name').html('');
            $scope.$storage.comitStuff = true;
            $.getJSON('http://congress.api.sunlightfoundation.com/bills?sponsor_id='+id +'&apikey=8b48c930d6bb4552be3b0e6248efb463').then(function (json){
              $scope.$storage.bills = true;
              for(j=0; j<json.results.length; j++){
                if(json.results[j].congress == '114'){
                 $scope.$storage.bill.push(json.results[j].bill_id); 
                $scope.$storage.shortTitle.push(json.results[j].short_title);
                var billStuff = json.results[j].last_version.urls.pdf;
                if($scope.$storage.bill.length < 1){
                  $scope.$storage.billStuff.push('This individual has not sponsored any bills yet this session');
                  alrert($scope.$storage.billStuff);
                }
                else{
                $scope.$storage.billStuff.push(billStuff);
                }
                }
              }
            })
            $.getJSON('http://congress.api.sunlightfoundation.com/committees?member_ids='+id+'&apikey=8b48c930d6bb4552be3b0e6248efb463').then(function (json){
              for(w = 0; w<json.results.length; w++){
                  $scope.$storage.committees.push(json.results[w].name);
              }
            })
            //&callback=?
            $.getJSON('http://transparencydata.com/api/1.0/entities.json?search='+firsties+'+'+lasties+'&callback=?&apikey=8b48c930d6bb4552be3b0e6248efb463').then(function (json){
              $scope.$storage.money = true;
              var newID = json[0].id;
              var totalP = json[0].count_received;
              $('.totalP').html(totalP);
              //allows for angular currency filter to work
              $timeout(function() { 
                total.push(json[0].total_received);
              }, 2000);
            $.getJSON('http://transparencydata.com/api/1.0/aggregates/pol/'+newID+'/contributors.json?cycle=2014&limit=10&callback=?&apikey=8b48c930d6bb4552be3b0e6248efb463').then(function (json){
              for(y = 0; y<json.length; y++){
                var contribName = json[y].name;
                var contribTotal = json[y].total_amount;
                contribNames.push(contribName);
                contribTotals.push(contribTotal)
                }
                $scope.$storage.contribNames= contribNames;
                $scope.$storage.contribTotals= contribTotals;

            })

            $.getJSON('http://transparencydata.com/api/1.0/aggregates/pol/'+newID+'/contributors/industries.json?cycle=2014&limit=10&callback=?&apikey=8b48c930d6bb4552be3b0e6248efb463').then(function (json){
              for(u = 0; u<json.length; u++){
                entityTotal.push(json[u].amount);
                 entityType.push(json[u].name);
              }
              $scope.$storage.entityType = entityType;
              $scope.$storage.entityTotal = entityTotal;
            })
            $.getJSON('http://transparencydata.com/api/1.0/entities/'+newID+'.json?cycle=2014&callback=?&apikey=8b48c930d6bb4552be3b0e6248efb463').then(function (json){
                var hmm =json.totals['2014'].recipient_amount;
                var hmmP = json.totals['2014'].recipient_count;
                $scope.$storage.total = hmm;
                $scope.$storage.hmmP = hmmP;
              });
          })
          })
        })

      }
    }
  })
$scope.$storage.reset= true;
$scope.zip = '';
}
  $scope.resetIt = function(){
$localStorage.$reset();
}
}])

}


if (Meteor.isServer) {
  Meteor.publish("recent", function () {
    Recent.find({
    })
    // code to run on server at startup
  });
}
