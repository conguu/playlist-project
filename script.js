const file = "playlist.csv";
let playlist = [];

function msToMinutesSecs(ms) {
	const totalSec = Math.floor(ms / 1000);
	const min = Math.floor(totalSec / 60);
	const sec = totalSec % 60;
	return `${min}:${sec.toString().padStart(2, "0")}`;
}

fetch(file)
	.then((response) => response.text())
	.then((csvText) => {
		Papa.parse(csvText, {
			header: true,
			skipEmptyLines: true,
			complete: (results) => {
				playlist = results.data;
				const html = playlist
					.map(
						(song) => `
                        <div class="song">
                            <div class="song-info">
                                <div>
                                    <div><strong>${song.TrackName}</strong> <br> ${song.ArtistNames}</div>
                                    <div><em>${song.AlbumName}</em> - ${song.ReleaseDate.slice(0, 4)}</div>
									<div>${song.Genres.replace(/,/g, ', ')}</div>
                                </div>
                                <span class="duration">${msToMinutesSecs(song.Duration)}</span>
                            </div>
                        </div>
                        `,
					)
					.join("");

				document.querySelector("#songs").innerHTML = html;
			},
		});
	})
	.catch((err) => {
		document.querySelector("#songs").innerHTML = "Error loading CSV file.";
		console.error(err);
	});
