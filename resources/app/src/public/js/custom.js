$(document).ready(function() {
  	$(".modal").modal({
		opacity: 0.1
  	});
  	$("ul.tabs").tabs();
  	$(".tooltipped").tooltip({ delay: 50 });
  	$(".button-collapse").sideNav();
  	$(".button-collapse").sideNav();




  	// Custom config
  	const $section = $('section')
  	const $loader = $section.find('div').filter('.center-align.loading')
  	const $main_info = $section.find('#main-info')
	const $bienvenida = $('.section_bienvenido_home')
	const $datosEB = $section.filter('.datosEB')
	const $search = $section.filter('#search')
	const $team = $section.filter('.team_main')
	

  	function showData(){
		$main_info
			.fadeIn(1000)
  	}
	
  	$loader
		.fadeOut(3000, "linear", showData)
			
	$bienvenida.fadeIn(1500)
	$datosEB.fadeIn(1500)
	$search.fadeIn(1500)
	$team.fadeIn(1500)
	
});
