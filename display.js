let lastCalledNumber = "";

// Hàm tự động phát âm thanh loa đọc
function phatLoaGoiSo(soThuTu, soQuay) {
    if ('speechSynthesis' in window) {
        // Cấu trúc câu thoại chuẩn theo yêu cầu: "Xin mời công dân số [Số] đến quầy số [Số quầy]"
        const cauNoi = `Xin mời công dân số ${soThuTu} đến quầy số ${soQuay}`;
        
        const speech = new SpeechSynthesisUtterance(cauNoi);
        speech.lang = 'vi-VN'; 
        speech.rate = 0.85; // Tốc độ đọc chậm rãi, rõ ràng cho hội trường rộng
        speech.pitch = 1.0; 
        
        window.speechSynthesis.speak(speech);
    } else {
        console.log("Trình duyệt không hỗ trợ phát giọng nói.");
    }
}

// Hàm cập nhật trạng thái hiển thị
export function capNhatManHinhTivi(soMoi, quayMoi) {
    if (soMoi !== lastCalledNumber) {
        // 1. Đổi dữ liệu hiển thị trên ô Tivi chính (bên trái)
        document.getElementById('current-number').innerText = soMoi;
        document.getElementById('current-quay').innerText = "QUẦY " + quayMoi;
        
        // 2. Kích hoạt Loa phát thanh
        phatLoaGoiSo(soMoi, quayMoi);
        
        // 3. Cập nhật số vào Quầy tương ứng trong danh sách 6 quầy (bên phải)
        const elementQuayPhu = document.getElementById(`history-q${quayMoi}`);
        if (elementQuayPhu) {
            elementQuayPhu.innerText = soMoi;
        }

        lastCalledNumber = soMoi;
    }
}

// TEST GIẢ LẬP: Tự động chạy thử sau 3 giây để kiểm tra giao diện và âm thanh quầy thực tế
setTimeout(() => {
    // Thử nghiệm gọi số 1001 đến Quầy 1
    capNhatManHinhTivi("1001", "1");
}, 3000);