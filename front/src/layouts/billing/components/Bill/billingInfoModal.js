import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

const BillingInfoModal = ({ showDetail, toggleDetail, orderNumber }) => {
  const [paymentInfo, setPaymentInfo] = useState(null);

  // useEffect(() => {
  //   const fetchPaymentInfo = async () => {
  //     try {
  //       const response = await axios.post(
  //         `http://localhost:8080/payment/getPaymentAndOrderInfo/` + orderNumber
  //       );

  //       console.log(response);
  //       setPaymentInfo(response.data.body);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchPaymentInfo();
  // }, []);

  return (
    <Dialog open={showDetail} onClose={toggleDetail} fullWidth={true} maxWidth={"xl"}>
      <DialogContent>
        <Card sx={{ marginBottom: 3 }}>
          <MDBox
            mx={2}
            py={3}
            px={2}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
              주문 정보
            </MDTypography>
          </MDBox>
          {/* 주문에 대한 자세한 정보를 표시합니다. */}
          <table className="mx-10 my-6 text-left">
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="w-1/5 font-bold pr-4 py-2 whitespace-nowrap">주문 번호:</td>
                <td className="py-2">{paymentInfo?.orderNumber}</td>
              </tr>
              <tr>
                <td className="w-1/5 font-bold pr-4 py-2 whitespace-nowrap">주문 일시:</td>
                <td className="py-2">
                  {paymentInfo && paymentInfo.orderAt
                    ? new Date(paymentInfo.orderAt * 1000).toLocaleString()
                    : "-"}
                </td>
              </tr>
              <tr>
                <td className="w-1/5 font-bold pr-4 py-2 whitespace-nowrap">상품명:</td>
                <td className="py-2">{paymentInfo?.productName}</td>
              </tr>
              <tr>
                <td className="w-1/5 font-bold pr-4 py-2 whitespace-nowrap">수령인:</td>
                <td className="py-2">{paymentInfo?.name}</td>
              </tr>
              <tr>
                <td className="w-1/5 font-bold pr-4 py-2 whitespace-nowrap">배송 주소:</td>
                <td className="py-2">{paymentInfo?.address}</td>
              </tr>
              <tr>
                <td className="w-1/5 font-bold pr-4 py-2 whitespace-nowrap">연락처:</td>
                <td className="py-2">{paymentInfo?.phone}</td>
              </tr>
            </tbody>
          </table>
        </Card>
        <Card>
          <MDBox
            mx={2}
            py={3}
            px={2}
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="h6" color="white">
              결제 정보
            </MDTypography>
          </MDBox>
          <table className="mx-10 my-6 text-start">
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="w-1/5 font-bold pr-4 py-2 whitespace-nowrap">결제 일시:</td>
                <td className="py-2">
                  {paymentInfo && paymentInfo.paymentAt
                    ? new Date(paymentInfo.paymentAt).toLocaleString()
                    : "-"}
                </td>
              </tr>
              <tr>
                <td className="w-1/5 font-bold pr-4 py-2 whitespace-nowrap">결제 수단:</td>
                <td className="py-2">{paymentInfo?.paymentMethod}</td>
              </tr>
              {/* paymentMethod에 따라 다른 정보 표시 */}
              {paymentInfo?.paymentMethod === "무통장 입금" && (
                <>
                  <tr>
                    <td className="w-1/5 font-bold pr-4 py-2 whitespace-nowrap">입금 은행:</td>
                    <td className="py-2">{paymentInfo?.vbankName}</td>
                  </tr>

                  <tr>
                    <td className="w-1/5 ont-bold pr-4 py-2 whitespace-nowrap">가상 계좌 번호:</td>
                    <td className="py-2">{paymentInfo?.vbankNum}</td>
                  </tr>
                </>
              )}
              {paymentInfo?.paymentMethod === "계좌이체" && (
                <tr>
                  <td className="w-1/5 font-bold pr-4 py-2 whitespace-nowrap">입금 은행:</td>
                  <td className="py-2">{paymentInfo?.bankName}</td>
                </tr>
              )}

              {paymentInfo?.paymentMethod === "신용/체크카드" && (
                <>
                  <tr>
                    <td className="w-1/5 font-bold pr-4 py-2 whitespace-nowrap">카드 종류:</td>
                    <td className="py-2">{paymentInfo?.cardName}</td>
                  </tr>
                  <tr>
                    <td className="w-1/5 font-bold pr-4 py-2 whitespace-nowrap">할부 개월 수:</td>
                    <td className="py-2">
                      {paymentInfo?.installmentMonths ? `${paymentInfo.installmentMonths}개월` : ""}
                    </td>
                  </tr>
                  <tr>
                    <td className="w-1/5 font-bold pr-4 py-2 whitespace-nowrap">카드 번호:</td>
                    <td className="py-2">{paymentInfo?.cardNumber}</td>
                  </tr>
                </>
              )}

              <tr>
                <td className="font-bold pr-4 py-2 whitespace-nowrap">사용한 쿠폰:</td>
                {paymentInfo?.coupon && (
                  <td className="py-2">
                    {paymentInfo?.coupon?.couponName} -
                    {paymentInfo?.coupon?.discount.toLocaleString()} 원
                  </td>
                )}
              </tr>

              <tr>
                <td className="font-bold pr-4 py-2 whitespace-nowrap">사용한 적립금:</td>
                {paymentInfo?.points ? (
                  <td className="py-2">{paymentInfo?.points?.toLocaleString()} 원</td>
                ) : (
                  <td className="py-2">0 원</td>
                )}
              </tr>
              <tr>
                <td className="font-bold pr-4 py-2 whitespace-nowrap">결제 금액:</td>
                <td className="py-2">{paymentInfo?.amount.toLocaleString()} 원</td>
              </tr>
              <tr>
                <td className="font-bold pr-4 py-2 whitespace-nowrap">결제 상태:</td>
                <td className="py-2">{paymentInfo?.paymentStatus}</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleDetail}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
};

BillingInfoModal.propTypes = {
  showDetail: PropTypes.bool.isRequired,
  toggleDetail: PropTypes.func.isRequired,
  orderNumber: PropTypes.string.isRequired,
};

export default BillingInfoModal;
