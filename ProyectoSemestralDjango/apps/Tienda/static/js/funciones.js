function toggleDropdown() {
	var dropdownMenu = document.getElementById("dropdown-menu");
	if (dropdownMenu.style.display === "block") {
	  dropdownMenu.style.display = "none";
	} else {
	  dropdownMenu.style.display = "block";
	}
}

function showTime() {
	var date = new Date();
	var h = date.getHours();
	var m = date.getMinutes();
	var s = date.getSeconds();
	var session = "AM";

	if (h == 0) {
	  h = 12;
	}

	if (h > 12) {
	  h = h - 12;
	  session = "PM";
	}

	h = (h < 10) ? "0" + h : h;
	m = (m < 10) ? "0" + m : m;
	s = (s < 10) ? "0" + s : s;

	var time = h + ":" + m + ":" + s + " " + session;
	document.getElementById("clock").innerText = time;
	setTimeout(showTime, 1000);
  }

  showTime();

  const toggleSwitch = document.querySelector('.dark-mode-toggle');

  toggleSwitch.addEventListener('change', function(e) {
	const body = document.querySelector('body');
	if (e.target.checked) {
	  body.classList.add('dark-mode');
	} else {
	  body.classList.remove('dark-mode');
	}
  });
  

  