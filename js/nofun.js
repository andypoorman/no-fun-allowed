require([
    '$api/models',
    ], function(models) {

	require(['$api/models'], function(models) {
		var player = models.player;
		var nowPlaying = document.getElementById('np');
		var songsSkipped = document.getElementById('ss');
		var skipped = 0;
		
		
		function updateStatus(track) {
			var artist = track.artists[0].name;
			var song = track.name;
			//console.log()
			if (track === null) {
				nowPlaying.innerHTML = 'No track currently playing';
			} else {
				nowPlaying.innerHTML = '<strong>Now playings:</strong> ' + artist + ' - ' + song;
				if (artist == 'Fun.') {
					player.skipToNextTrack();
					skipped++;
					songsSkipped.innerHTML = '<strong>"Fun." songs skipped:</strong> ' + skipped;
				}
			}
		
		}

		// update on load
		models.player.load('track').done(function(p) {
			updateStatus(p.track);
			console.log(p);
		});

		// update on change
		models.player.addEventListener('change', function(p) {
			updateStatus(p.data.track);
		});
	});

    // When arguments change, run pages function
    models.application.addEventListener('arguments', updatestatus);
}); // require
