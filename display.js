let lastCalledNumber = "";

// Hàm xử lý phát loa thông báo ngắt nghỉ từng số chậm rãi (Ưu tiên giọng Nữ miền Bắc Microsoft An / Google)
function phatLoaGoiSo(soThuTu, soQuay) {
    if ('speechSynthesis' in window) {
        // Tách chuỗi số thành từng số rời nhau bằng dấu phẩy (Ví dụ: "1, 0, 0, 2")
        const soDocTach = soThuTu.split('').join(', '); 
        const cauNoi = `Xin mời công dân số, ${soDocTach}, đến quầy số, ${soQuay}`;
        
        const speech = new SpeechSynthesisUtterance(cauNoi);
        speech.lang = 'vi-VN'; 
        speech.rate = 0.7; // Tốc độ đọc thong thả
        speech.pitch = 1.0; 

        // LẤY DANH SÁCH GIỌNG NÓI CÓ SẴN TRÊN TRÌNH DUYỆT
        const voices = window.speechSynthesis.getVoices();
        
        // Ưu tiên tìm giọng Microsoft An (Miền Bắc), Google tiếng Việt hoặc Northern
        const giongMienBac = voices.find(voice => 
            voice.lang === 'vi-VN' && (voice.name.includes('An') || voice.name.includes('Google') || voice.name.includes('Northern'))
        );

        // Nếu tìm thấy giọng miền Bắc thì áp dụng, không thì dùng giọng tiếng Việt mặc định
        if (giongMienBac) {
            speech.voice = giongMienBac;
        }
        
        window.speechSynthesis.speak(speech);
    } else {
        console.log("Trình duyệt không hỗ trợ phát giọng nói.");
    }
}

// Hàm xử lý nhận lệnh và đổi số trên màn hình Tivi
function capNhatManHinhTivi(soMoi, quayMoi) {
    const idThanhPhan = `history-q${quayMoi}`;
    const elementQuayPhu = document.getElementById(idThanhPhan);
    
    if (elementQuayPhu) {
        // Cập nhật số mới vào ô quầy tương ứng
        elementQuayPhu.innerText = soMoi;
        
        // Gọi loa phát thanh ngay lập tức
        phatLoaGoiSo(soMoi, quayMoi);
        
        lastCalledNumber = soMoi;
        console.log(`Đã gọi số ${soMoi} đến quầy ${quayMoi}`);
    } else {
        console.log(`Không tìm thấy ô hiển thị của Quầy số: ${quayMoi}`);
    }
}

// Đẩy hàm ra môi trường toàn cục để F12 Console gọi được trực tiếp
window.capNhatManHinhTivi = capNhatManHinhTivi;

// Nạp sẵn danh sách giọng nói khi vừa mở trang web
if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = function() {
        window.speechSynthesis.getVoices();
    };
}