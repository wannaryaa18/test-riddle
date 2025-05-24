document.addEventListener('DOMContentLoaded', () => {
    const screens = document.querySelectorAll('.screen');
    const startScreen = document.getElementById('startScreen');
    const locationSelectionScreen = document.getElementById('locationSelectionScreen');
    // const qrScanScreen = document.getElementById('qrScanScreen'); // Dihapus
    const quizScreen = document.getElementById('quizScreen');
    const certificateScreen = document.getElementById('certificateScreen');

    const userNameInput = document.getElementById('userName');
    const startButton = document.getElementById('startButton');
    const languageButtons = document.querySelectorAll('.language-btn');
    const locationButtons = document.querySelectorAll('.location-btn');
    // const qrScannedButton = document.getElementById('qrScannedButton'); // Dihapus
    const quizTitle = document.getElementById('quizTitle');
    const quizQuestion = document.getElementById('quizQuestion');
    const quizAnswerInput = document.getElementById('quizAnswer');
    const submitAnswerButton = document.getElementById('submitAnswerButton');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const certificateUserName = document.getElementById('certificateUserName');
    const finalCertificateName = document.getElementById('finalCertificateName');
    const certificateDate = document.getElementById('certificateDate');
    const downloadCertificateButton = document.getElementById('downloadCertificateButton');
    const restartButton = document.getElementById('restartButton');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const toastElement = document.getElementById('toast');
    const containerElement = document.querySelector('.container');

    let currentLanguage = 'en'; // Default language
    let currentUserName = '';
    let currentLocation = '';
    let currentQuizIndex = 0;
    let quizData = {};

    const riddles = {
        jakartaKota: [
            {
                en: {
                    title: "Jakarta Kota Station",
                    question: `The beauty lays in this building.
                    Look above and find the iron half-moon,
                    timeless silvery-grey,
                    count the blessing.
                    Add up with the number of lanes,
                    spread in front of you,
                    lay on the ground.
                    Fill in the number code below to continue.
                    (2 digits)`,
                    answer: "18"
                },
                id: {
                    title: "Stasiun Jakarta Kota",
                    question: `Keindahan terletak pada bangunan ini.
                    Lihatlah ke atas dan temukan besi setengah bulan,
                    abu-abu keperakan abadi,
                    hitunglah anugerahnya.
                    Tambahkan dengan jumlah jalur,
                    terbentang di depanmu,
                    terletak di tanah.
                    Isi kode angka di bawah untuk melanjutkan.
                    (2 digit)`,
                    answer: "18"
                }
            },
            {
                en: {
                    title: "Old Town Station",
                    question: `The day is almost over,
                    go get in touch with the sunlight.
                    Exit through the North gate,
                    walk ahead till you find the big square.
                    When you're there, stand in the center.
                    Look ahead to the north,
                    and find another lane, buried down below.
                    Forgotten from the past
                    Streetcar named Despair.
                    Find my name.
                    (4 letters)`,
                    answer: "TREM"
                },
                id: {
                    title: "Stasiun Kota Tua",
                    question: `Hari hampir berakhir,
                    pergilah sentuh cahaya matahari.
                    Keluar melalui gerbang Utara,
                    berjalanlah sampai kamu menemukan alun-alun besar.
                    Ketika kamu sampai di sana, berdirilah di tengah.
                    Lihatlah ke depan ke utara,
                    dan temukan jalur lain, terkubur di bawah.
                    Terlupakan dari masa lalu
                    Trem bernama Despair.
                    Temukan namaku.
                    (4 huruf)`,
                    answer: "TREM"
                }
            },
            {
                en: {
                    title: "Old Town Station",
                    question: `Tram line brought me here.
                    Ex Me Ipsa Renata Sum.
                    I was made out of myself.
                    I destroyed a lot of fortress.
                    I am the thumb in between index and middle finger.
                    What a strong name, they called me with.
                    You should not forget, that I am.
                    (5 letters)`,
                    answer: "JAGUR"
                },
                id: {
                    title: "Stasiun Kota Tua",
                    question: `Jalur trem membawaku ke sini.
                    Ex Me Ipsa Renata Sum.
                    Aku terbuat dari diriku sendiri.
                    Aku menghancurkan banyak benteng.
                    Aku adalah jempol di antara jari telunjuk dan jari tengah.
                    Nama yang kuat, mereka memanggilku dengan itu.
                    Kamu tidak boleh lupa, bahwa aku adalah.
                    (5 huruf)`,
                    answer: "JAGUR"
                }
            },
            {
                en: {
                    title: "Batavia Nord Station Train Bridge",
                    question: `Beneath this bridge,
                    a river runs through history.
                    Its waters have seen colonial tales
                    and witnessed time flow endlessly.
                    This river connects the city to its roots.
                    Name the river.
                    (One word)`,
                    answer: "CILIWUNG"
                },
                id: {
                    title: "Jembatan kereta stasiun batavia nord",
                    question: `Di bawah jembatan ini,
                    sebuah sungai mengalir melalui sejarah.
                    Airnya telah melihat kisah-kisah kolonial
                    dan menyaksikan waktu mengalir tanpa henti.
                    Sungai ini menghubungkan kota dengan akarnya.
                    Sebutkan nama sungainya.
                    (Satu kata)`,
                    answer: "CILIWUNG"
                }
            }
        ],
        kampungSusun: [
            {
                en: {
                    title: "Kampung Susun Kunir",
                    question: `Beneath the leaves and morning rain,
                    where orange wood holds roots again.
                    Not just a bench, not just a seat,
                    but stories carved where plant life meets.
                    Letters curved in playful form,
                    hidden in places quiet, warm.
                    Not one place, but many as one
                    a name they share under the sun.
                    Look close where the plants align,
                    read what the wood leaves behind.
                    (9 letters)`,
                    answer: "KOLLEKTIEF"
                },
                id: {
                    title: "Kampung Susun Kunir",
                    question: `Di bawah dedaunan dan hujan pagi,
                    di mana kayu oranye menahan akar lagi.
                    Bukan hanya bangku, bukan hanya tempat duduk,
                    tapi cerita terukir di mana kehidupan tanaman bertemu.
                    Huruf-huruf melengkung dalam bentuk yang menyenangkan,
                    tersembunyi di tempat yang tenang, hangat.
                    Bukan satu tempat, tapi banyak sebagai satu
                    nama yang mereka bagikan di bawah matahari.
                    Lihatlah dekat di mana tanaman berjejer,
                    baca apa yang ditinggalkan kayu.
                    (9 huruf)`,
                    answer: "KOLLEKTIEF"
                }
            },
            {
                en: {
                    title: "Kampung Susun Kunir",
                    question: `Down below where stories sleep, beneath the frame of rising hope. Concrete veins that echo feet, count your steps before you cope.
                    Between the past and future’s grace, lies the gallery, hidden face. One by one you must descend, 'till double digits mark the end.
                    Just before the silence hums how many steps to reach the drums? (2 digits)`,
                    answer: "10"
                },
                id: {
                    title: "Kampung Susun Kunir",
                    question: `Di bawah sana tempat cerita tidur, di bawah kerangka harapan yang meninggi. Urat beton yang menggemakan langkah kaki, hitung langkahmu sebelum kamu mengatasinya.
                    Di antara masa lalu dan anugerah masa depan, terletak galeri, wajah tersembunyi. Satu per satu kamu harus turun, sampai dua digit menandai akhirnya.
                    Tepat sebelum keheningan bergemuruh, berapa banyak langkah untuk mencapai genderang? (2 digit)`,
                    answer: "10"
                }
            },
            {
                en: {
                    title: "Kampung Susun Kunir",
                    question: `A taste that dances, sweet and wild,
                    found where stories feed the child.
                    Not just fruit, but spice and soul,
                    mixed together in one bold bowl.
                    It stains your lips with tangy cheer,
                    a local treat, both far and near.
                    In Kunir's heart, it's served with pride
                    a flavor that won’t ever hide.
                    Crunchy, fresh, and full of zest,
                    this spicy mix is simply the best.
                    Find my name.
                    (5 letters)`,
                    answer: "RUJAK"
                },
                id: {
                    title: "Kampung Susun Kunir",
                    question: `Sebuah rasa yang menari, manis dan liar,
                    ditemukan di mana cerita memberi makan anak.
                    Bukan hanya buah, tapi rempah dan jiwa,
                    dicampur menjadi satu mangkuk yang berani.
                    Ini mewarnai bibirmu dengan keceriaan yang tajam,
                    hidangan lokal, baik jauh maupun dekat.
                    Di hati Kunir, disajikan dengan bangga
                    rasa yang tidak akan pernah bersembunyi.
                    Renjah, segar, dan penuh semangat,
                    campuran pedas ini adalah yang terbaik.
                    Temukan namaku.
                    (5 huruf)`,
                    answer: "RUJAK"
                }
            },
            {
                en: {
                    title: "Kampung Susun Kunir",
                    question: `I’m ancient, yet I still serve,
                    A silent witness with steady nerve.
                    Carved by hands from time gone past,
                    I helped the walls and roofs to last.
                    You won’t find me up above,
                    But I’m the base that buildings love.
                    A relic of tradition, strong and stout
                    What am I?`,
                    answer: "UMPAK"
                },
                id: {
                    title: "Kampung Susun Kunir",
                    question: `Aku kuno, namun aku masih melayani,
                    Saksi bisu dengan saraf yang mantap.
                    Diukir oleh tangan dari masa lalu,
                    Aku membantu dinding dan atap bertahan.
                    Kamu tidak akan menemukan aku di atas,
                    Tapi aku adalah dasar yang disukai bangunan.
                    Peninggalan tradisi, kuat dan kokoh
                    Apa aku?`,
                    answer: "UMPAK"
                }
            }
        ]
    };

    const backgroundImages = {
        initial: 'https://cdn0-production-images-kly.akamaized.net/QKsLjw3Yb7LlHsuNz7VqHSJXdBY=/1200x1200/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4154182/original/060036200_1662894591-Kampung-Susun-Kunir-Iqbal-1.jpg',
        jakartaKota: 'https://assets-a1.kompasiana.com/items/album/2022/07/05/desain-tanpa-judul-2-62c41e2c297d681817028822.png',
        kampungSusun: 'https://asset.kompas.com/crops/DSA1wzeWNr4JmttzIa0neAOdZAg=/0x0:0x0/1200x800/data/photo/2022/09/14/63219032224d4.jpg'
    };

    const certificateBackgroundUrl = 'sertif.png';
    const certificateSealUrl = 'logo.png'; 


    function showScreen(screenToShow) {
        showLoading();
        setTimeout(() => { // Simulate loading time
            screens.forEach(screen => screen.classList.remove('active'));
            screenToShow.classList.add('active');
            feedbackMessage.textContent = '';
            feedbackMessage.classList.remove('success', 'error');
            hideLoading();
            if (screenToShow === certificateScreen) {
                // Preload certificate background image to avoid blank download
                const img = new Image();
                img.src = certificateBackgroundUrl;
                img.onload = () => {
                    document.querySelector('.certificate-preview').style.backgroundImage = `url('${certificateBackgroundUrl}')`;
                    document.querySelector('.certificate-seal').src = certificateSealUrl; // Set seal image
                };
            }
            containerElement.classList.add('loaded'); // Trigger container animation
        }, 500); // 500ms delay for loading animation
    }

    function showLoading() {
        loadingOverlay.classList.add('visible');
    }

    function hideLoading() {
        loadingOverlay.classList.remove('visible');
    }

    function setBackground(imageUrl) {
        document.body.style.backgroundImage = `url('${imageUrl}')`;
        // Pastikan overlay tetap ada saat background diganti
        document.body.style.backgroundColor = `rgba(0, 0, 0, 0.4)`; // Tetapkan opacity di sini juga
        document.body.style.backgroundBlendMode = `overlay`;
    }

    function showToast(message, type = 'info') {
        toastElement.textContent = message;
        toastElement.className = 'toast show ' + type;
        setTimeout(() => {
            toastElement.classList.remove('show');
        }, 3000); // Hide after 3 seconds
    }

    // Fungsi untuk memperbarui teks UI berdasarkan bahasa
    function updateUIText() {
        if (currentLanguage === 'id') {
            startButton.textContent = 'Mulai Petualangan';
            submitAnswerButton.textContent = 'Kirim Jawaban';
            userNameInput.placeholder = 'Masukkan nama Anda';
            // menambahkan update teks lain di sini jika diperlukan
            // Contoh: document.getElementById('quizTitle').textContent = quiz.title (ini sudah di handle di loadQuiz)
            // document.getElementById('downloadCertificateButton').textContent = 'Unduh Sertifikat'; // Contoh
        } else {
            startButton.textContent = 'Start Adventure';
            submitAnswerButton.textContent = 'Submit Answer';
            userNameInput.placeholder = 'Enter your name';
            // Contoh: document.getElementById('downloadCertificateButton').textContent = 'Download Certificate'; // Contoh
        }
    }

    // Initial background
    setBackground(backgroundImages.initial);
    showScreen(startScreen); // Show start screen after initial setup
    updateUIText(); // Panggil saat inisialisasi untuk memastikan teks awal sesuai bahasa

    // Add ripple effect listener to all buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const circle = document.createElement('span');
            const diameter = Math.max(this.clientWidth, this.clientHeight);
            const radius = diameter / 2;

            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - (this.offsetLeft + radius)}px`;
            circle.style.top = `${e.clientY - (this.offsetTop + radius)}px`;
            circle.classList.add('ripple');

            const ripple = this.getElementsByClassName('ripple')[0];
            if (ripple) {
                ripple.remove();
            }
            this.appendChild(circle);
        });
    });

    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            languageButtons.forEach(btn => btn.classList.remove('active')); // Hapus active dari semua
            button.classList.add('active'); // Tambah active ke yang diklik
            currentLanguage = button.dataset.lang;
            updateUIText(); // Panggil untuk memperbarui teks
            showToast(currentLanguage === 'en' ? 'Language changed to English' : 'Bahasa diubah ke Indonesia', 'info');
        });
    });

    startButton.addEventListener('click', () => {
        currentUserName = userNameInput.value.trim();
        if (currentUserName === '') {
            userNameInput.classList.add('error'); // Add error class for shake animation
            showToast(currentLanguage === 'en' ? 'Please enter your name!' : 'Mohon masukkan nama Anda!', 'error');
            setTimeout(() => userNameInput.classList.remove('error'), 500);
            return;
        }
        showScreen(locationSelectionScreen);
    });

    locationButtons.forEach(button => {
        button.addEventListener('click', () => {
            locationButtons.forEach(btn => btn.classList.remove('primary-btn'));
            button.classList.add('primary-btn');
            currentLocation = button.dataset.location;
            quizData = riddles[currentLocation];
            setBackground(backgroundImages[currentLocation]);
            currentQuizIndex = 0;
            // Langsung ke quizScreen setelah lokasi dipilih (menghilangkan QR screen)
            loadQuiz(); // Muat soal pertama
            showScreen(quizScreen); // Tampilkan layar kuis
        });
    });
    function loadQuiz() {
        if (currentQuizIndex < quizData.length) {
            const quiz = quizData[currentQuizIndex][currentLanguage];
            quizTitle.textContent = quiz.title;
            quizAnswerInput.value = '';
            feedbackMessage.textContent = '';
            feedbackMessage.classList.remove('success', 'error');
            quizAnswerInput.style.borderColor = '#ddd'; // Reset input border color
            quizQuestion.textContent = quiz.question; // Tampilkan teks soal secara instan
        } else {
            showCertificateScreen();
        }
    }

    submitAnswerButton.addEventListener('click', () => {
        const userAnswer = quizAnswerInput.value.trim().toUpperCase();
        const correctAnswer = quizData[currentQuizIndex][currentLanguage].answer.toUpperCase();

        if (userAnswer === correctAnswer) {
            feedbackMessage.textContent = currentLanguage === 'en' ? 'Correct answer! Moving to the next riddle...' : 'Jawaban benar! Melanjutkan ke riddle berikutnya...';
            feedbackMessage.className = 'feedback success';
            quizAnswerInput.style.borderColor = 'var(--success-color)';
            setTimeout(() => {
                currentQuizIndex++;
                loadQuiz();
            }, 1500); // Increased delay for better feedback
        } else {
            feedbackMessage.textContent = currentLanguage === 'en' ? 'Incorrect answer. Please try again.' : 'Jawaban salah. Silakan coba lagi.';
            feedbackMessage.className = 'feedback error';
            quizAnswerInput.classList.add('error'); // Trigger shake on incorrect answer
            quizAnswerInput.style.borderColor = 'var(--error-color)';
            setTimeout(() => quizAnswerInput.classList.remove('error'), 500);
        }
    });

    function showCertificateScreen() {
        certificateUserName.textContent = currentUserName;
        finalCertificateName.textContent = currentUserName;
        const today = new Date();
        certificateDate.textContent = today.toLocaleDateString(currentLanguage === 'en' ? 'en-US' : 'id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
        showScreen(certificateScreen);
    }

    downloadCertificateButton.addEventListener('click', () => {
        downloadCertificateButton.disabled = true; // Prevent multiple clicks
        downloadCertificateButton.textContent = currentLanguage === 'en' ? 'Generating...' : 'Membuat...';
        showToast(currentLanguage === 'en' ? 'Generating certificate...' : 'Membuat sertifikat...', 'info');

        const certificateContent = document.querySelector('.certificate-preview');

        // To ensure background image is loaded and rendered in html2canvas
        const originalBg = certificateContent.style.backgroundImage;
        const originalSealSrc = document.querySelector('.certificate-seal').src;

        certificateContent.style.backgroundImage = `url('${certificateBackgroundUrl}')`;
        document.querySelector('.certificate-seal').src = certificateSealUrl;

        // Give a brief moment for images to render
        setTimeout(() => {
            html2canvas(certificateContent, {
                scale: 2, // Higher scale for better quality
                useCORS: true, // Crucial for external images
                allowTaint: true,// May be needed for some cross-origin images, but use useCORS first
                useCORS: true,
    backgroundColor: '#FFFFFF', // Pastikan background defaultnya putih
    scale: 2, // Coba tingkatkan scale untuk kualitas lebih tinggi
    logging: true,
            }).then(canvas => {
                const link = document.createElement('a');
                link.download = `Certificate_JakartaRiddleAdventure_${currentUserName.replace(/\s+/g, '_')}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();

                // Restore original styles (if any)
                certificateContent.style.backgroundImage = originalBg;
                document.querySelector('.certificate-seal').src = originalSealSrc;

                downloadCertificateButton.disabled = false;
                downloadCertificateButton.textContent = currentLanguage === 'en' ? 'Download Certificate' : 'Unduh Sertifikat';
                showToast(currentLanguage === 'en' ? 'Certificate downloaded!' : 'Sertifikat berhasil diunduh!', 'success');
            }).catch(error => {
                console.error("Error generating certificate:", error);
                showToast(currentLanguage === 'en' ? 'Failed to generate certificate.' : 'Gagal membuat sertifikat.', 'error');
                downloadCertificateButton.disabled = false;
                downloadCertificateButton.textContent = currentLanguage === 'en' ? 'Download Certificate' : 'Unduh Sertifikat';
            });
        }, 1000); // Small delay to ensure image rendering
    });

    restartButton.addEventListener('click', () => {
        currentQuizIndex = 0;
        currentUserName = '';
        userNameInput.value = '';
        currentLocation = '';
        currentLanguage = 'en'; // Reset bahasa ke English saat restart
        languageButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector('.language-selection .btn[data-lang="en"]').classList.add('active'); // Set English aktif
        locationButtons.forEach(btn => btn.classList.remove('primary-btn'));
        setBackground(backgroundImages.initial);
        updateUIText(); // Perbarui teks UI setelah restart
        showScreen(startScreen);
        showToast(currentLanguage === 'en' ? 'Adventure restarted!' : 'Petualangan dimulai ulang!', 'info');
    });
});