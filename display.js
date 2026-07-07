function phatLoaGoiSo(soThuTu, soQuay) {
    if ('speechSynthesis' in window) {
        // Tách chuỗi số thành từng số rời nhau bằng dấu phẩy (Ví dụ: "1, 0, 0, 2,")
        const soDocTach = soThuTu.split('').join(', '); 
        
        // Câu thoại mới có dấu phẩy để máy tự ngắt nghỉ
        const cauNoi = `Xin mời công dân số, ${soDocTach}, đến quầy số, ${soQuay}`;
        
        const speech = new SpeechSynthesisUtterance(cauNoi);
        speech.lang = 'vi-VN'; 
        speech.rate = 0.75; // Tốc độ vừa phải
        speech.pitch = 1.0; 
        
        window.speechSynthesis.speak(speech);
    }
}