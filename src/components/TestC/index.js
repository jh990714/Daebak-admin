import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

function TestC(state) {
  const [open, setOpen] = useState(state);

  const handleOpen = () => {
    setOpen(true);
  };

  // 팝업창을 닫기 위한 함수
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* Dialog 컴포넌트로 팝업창을 생성 */}
      <Dialog open={handleOpen} onClose={handleClose}>
        {/* 팝업창의 제목 */}
        <DialogTitle>팝업 제목</DialogTitle>
        {/* 팝업창의 내용 */}
        <DialogContent>음</DialogContent>
        {/* 팝업창 하단의 액션 버튼 */}
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TestC;
