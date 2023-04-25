import React from "react";
const Certificate = ({ size = 24, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" width={size} height={size}>
    <path
      fill="#BBB0FF"
      fillRule="evenodd"
      d="M9.481 19.744c.295-.039.593.041.828.222l1.084.832a.995.995 0 0 0 1.213 0l1.125-.864a.995.995 0 0 1 .737-.197l1.407.185a.997.997 0 0 0 1.051-.607l.541-1.308a.993.993 0 0 1 .54-.54l1.31-.542a.997.997 0 0 0 .606-1.051l-.178-1.356a1.117 1.117 0 0 1 .222-.828l.832-1.084a.995.995 0 0 0 0-1.213l-.864-1.125a.995.995 0 0 1-.197-.737l.185-1.407a.997.997 0 0 0-.607-1.051l-1.308-.541a.993.993 0 0 1-.54-.54l-.542-1.309a.997.997 0 0 0-1.051-.607l-1.407.185a.99.99 0 0 1-.736-.195l-1.125-.864a.995.995 0 0 0-1.213 0l-1.125.864c-.21.16-.475.23-.737.197l-1.407-.185a.997.997 0 0 0-1.051.607l-.54 1.309a1.006 1.006 0 0 1-.54.54l-1.309.54a.997.997 0 0 0-.607 1.051l.185 1.407a1 1 0 0 1-.197.736l-.864 1.125a.995.995 0 0 0 0 1.213l.864 1.125c.16.21.232.475.197.737l-.185 1.407a.997.997 0 0 0 .607 1.051l1.309.541c.245.101.439.296.54.54l.541 1.31a.997.997 0 0 0 1.051.606l1.355-.179Z"
      clipRule="evenodd"
    />
    <path
      stroke="#BBB0FF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9.481 19.744c.295-.039.593.041.828.222l1.084.832a.995.995 0 0 0 1.213 0l1.125-.864a.995.995 0 0 1 .737-.197l1.407.185a.997.997 0 0 0 1.051-.607l.541-1.308a.993.993 0 0 1 .54-.54l1.31-.542a.997.997 0 0 0 .606-1.051l-.178-1.356a1.117 1.117 0 0 1 .222-.828l.832-1.084a.995.995 0 0 0 0-1.213l-.864-1.125a.995.995 0 0 1-.197-.737l.185-1.407a.997.997 0 0 0-.607-1.051l-1.308-.541a.993.993 0 0 1-.54-.54l-.542-1.309a.997.997 0 0 0-1.051-.607l-1.407.185a.99.99 0 0 1-.736-.195l-1.125-.864a.995.995 0 0 0-1.213 0l-1.125.864c-.21.16-.475.23-.737.197l-1.407-.185a.997.997 0 0 0-1.051.607l-.54 1.309a1.006 1.006 0 0 1-.54.54l-1.309.54a.997.997 0 0 0-.607 1.051l.185 1.407a1 1 0 0 1-.197.736l-.864 1.125a.995.995 0 0 0 0 1.213l.864 1.125c.16.21.232.475.197.737l-.185 1.407a.997.997 0 0 0 .607 1.051l1.309.541c.245.101.439.296.54.54l.541 1.31a.997.997 0 0 0 1.051.606l1.355-.179"
    />
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="m14.8 10.6-3.502 3.502-2.1-2.1"
    />
  </svg>
);
export default Certificate;
