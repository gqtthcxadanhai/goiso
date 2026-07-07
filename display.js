let lastCalledNumber = "";

function phatLoaGoiSo(soThuTu, soQuay) {
    if ('speechSynthesis' in window) {
        const cauNoi = `Xin mời công dân số ${soThuTu} đến quầy số ${soQuay}`;
        const speech = new SpeechSynthesisUtterance(cauNoi);
        speech.lang = 'vi-VN'; 
        speech.rate = 0.85; 
        speech.pitch = 1.0; 
        window.speechSynthesis.speak(speech);
    }
}

function capNhatManHinhTivi(soMoi, quayMoi) {
    if (soMoi !== lastCalledNumber) {
        const elementQuayPhu = document.getElementById(`history-q${quayMoi}`);
        if (elementQuayPhu) {
            elementQuayPhu.innerText = soMoi;
            phatLoaGoiSo(soMoi, quayMoi);
            lastCalledNumber = soMoi;
        }
    }
}

// Giả lập hệ thống tự động nhảy số sau 2 giây để anh kiểm tra trực quan
setTimeout(() => {
    capNhatManHinhTivi("1001", "1");
}, 2000);

setTimeout(() => {
    capNhatManHinhTivi("2005", "2");
}, 5000);