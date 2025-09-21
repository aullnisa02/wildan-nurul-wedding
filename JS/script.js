AOS.init();

// Music
var tempMusic = '';
var music = document.querySelector('.music');
if (tempMusic) {
  music.src = tempMusic;
}

// Heading
function mulai() {
  // Back to top
  window.scrollTo(0, 0);

  // Sound effect
  var soundEffect = document.querySelector('.sound-effect');
  if (soundEffect) {
    soundEffect.play();
  }

  // Heading section
  var headingSection = $('#heading-section');
  var headingButtons = document.querySelectorAll('#heading-section .btn-get-started');
  headingButtons.forEach(function (btn, index) {
    var direction = (index === 0) ? -1 : 1;
    btn.style.transform = 'rotateY(' + (70 * direction) + 'deg)';
  });

  // First timeout
  setTimeout(function() {
    if (music) {
      music.play();
    }
    headingSection.css('transform', 'scale(6)');
  }, 600);

  setTimeout(function() {
    headingSection.css('opacity', 0);
    $('body').removeClass('overflow-hidden');
    $('body').addClass('transition');
    headingSection.css('display', 'none');
  }, 2000);
}

// Nama tamu
const urlParams = new URLSearchParams(window.location.search);
const nama = urlParams.get('n');
const namaTamu = document.querySelector('#nama-tamu');
if (namaTamu && nama) {
  namaTamu.innerText = `${nama}`;
}

// Music button
var isPlaying = true;
function toggleMusic(event) {
  event.preventDefault();
  const musicButton = document.getElementById('music-button');
  if (isPlaying) {
    musicButton.innerHTML = '<i class="fas fa-fw fa-pause"></i>';
    musicButton.classList.remove('rotate');
    musicButton.style.transform = 'translateY(0)';
    if (music) {
      music.pause();
    }
  } else {
    musicButton.innerHTML = '<i class="fas fa-fw fa-compact-disc"></i>';
    musicButton.classList.add('rotate');
    if (music) {
      music.play();
    }
  }
  isPlaying = !isPlaying;
}

// Countdown
var countdownDate = new Date("Oct 04, 2025 10:00:00").getTime();
var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countdownDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  var countdownElement = document.getElementById('countdown-wedding');
  if (countdownElement) {
    countdownElement.innerHTML = `
      <div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-dark"><h5>${days}</h5>Hari</div></div>
      <div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-dark"><h5>${hours}</h5>Jam</div></div>
      <div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-dark"><h5>${minutes}</h5>Menit</div></div>
      <div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-dark"><h5>${seconds}</h5>Detik</div></div>`;

    if (distance < 0) {
      clearInterval(x);
      countdownElement.innerHTML = "<span class='text-center p-3 rounded m-2'><h2>Sudah dimulai!</h2></span>";
    }
  }
}, 1000);

// Hero button to Pengantin-section
document.querySelectorAll('#hero-section .btn-get-started').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    var pengantinSection = document.getElementById('pengantin-section');
    if (pengantinSection) {
      pengantinSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Galeri Carousel
document.addEventListener('DOMContentLoaded', function() {
  const galeriCarousel = new bootstrap.Carousel(document.getElementById('galeriCarousel'), {
    interval: 5000,
    pause: 'hover'
  });
});

// copy text
function copyText(el)
{
    var content = jQuery(el).siblings('div.card-container').find('div.card-number').text().trim()

    var temp = document.createElement("textarea")

    document.body.appendChild(temp)

    temp.value = content.replace(/\s+/g, ' ')
    temp.select()

    document.execCommand("copy")

    document.body.removeChild(temp)

    jQuery(el).text('Berhasil di copy!')

    setTimeout(function () {
        jQuery(el).html(`<i class="fas fa-regular fa-copy"></i>Salin`)
    }, 2000)
}

// copy text alamat
function copyAddress(el) {
    var content = jQuery(el).closest('.alamat-card').find('.card-text').text().trim();

    var temp = document.createElement("textarea");
    document.body.appendChild(temp);
    temp.value = content;
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);

    jQuery(el).text('Alamat Tersalin!');
    setTimeout(function() {
        jQuery(el).html(`<i class="fas fa-fw fa-copy"></i> Salin Alamat`);
    }, 2000);
}

// RSVP Form
window.addEventListener("DOMContentLoaded", function() {
    const APP_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbynLMC85y3EidcFXuj3juo9YlVMTQQYpKXBfRuJ2EXPFSfiaahoONVo0eRHXIsMwjJLtA/exec";

    const form = document.getElementById("rsvp-form");
    const guestbookContainer = document.getElementById("guestbook-messages");
    
    function fetchAndDisplayMessages() {
        fetch(APP_SCRIPT_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(messages => {
                guestbookContainer.innerHTML = '';
                
                if (messages.length === 0) {
                    guestbookContainer.innerHTML = '<p class="text-center">Belum ada pesan. Kirim pesan pertama Anda!</p>';
                    return;
                }

                messages.reverse().forEach(msg => {
                    const messageCard = document.createElement('div');
                    messageCard.className = 'col-lg-6 message-card';
                    messageCard.innerHTML = `
                        <h5>${msg.nama}</h5>
                        <p><strong>Konfirmasi:</strong> ${msg.konfirmasi}</p>
                        <p><strong>Pesan:</strong> ${msg.pesan}</p>
                    `;
                    guestbookContainer.appendChild(messageCard);
                });
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
                guestbookContainer.innerHTML = '<p class="text-center">Gagal memuat pesan. Silakan coba lagi nanti.</p>';
            });
    }

    fetchAndDisplayMessages();

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const nama = document.getElementById("nama").value.trim();
        const konfirmasi = document.getElementById("konfirmasi").value;

        if (nama === "" || konfirmasi === "") {
            alert("Nama dan konfirmasi kehadiran tidak boleh kosong.");
            return;
        }

        const data = new FormData(form);
        const inputElements = form.querySelectorAll("input, select, button, textarea");
        
        inputElements.forEach(i => i.disabled = true);

        fetch(APP_SCRIPT_URL, { 
            method: "POST",
            body: data,
        })
        .then(response => response.json())
        .then(result => {
            if (result.status === 'success') {
                form.reset();
                alert("Terima kasih atas konfirmasinya!");
                fetchAndDisplayMessages();
            } else {
                alert("Terjadi kesalahan. Silakan coba lagi.");
            }
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            alert("Terjadi kesalahan. Silakan coba lagi.");
        })
        .finally(() => {
            inputElements.forEach(i => i.disabled = false);
        });
    });
});

// Footer year
document.getElementById('currentYearFooter').textContent = new Date().getFullYear();