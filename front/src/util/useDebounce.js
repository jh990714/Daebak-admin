import { useState, useEffect } from "react";

// `useDebounce` 훅을 JavaScript로 구현
export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 타이머 설정. 지연 시간이 지난 후에 값을 갱신
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 컴포넌트가 언마운트되거나 값이 변경될 때 타이머를 정리
    return () => clearTimeout(timer);
  }, [value, delay]); // `value`와 `delay`가 변경될 때마다 이펙트가 실행됩니다.

  return debouncedValue;
}
