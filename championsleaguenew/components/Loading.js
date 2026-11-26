export default function Loading() {
  return (
    <div class="loader-container">
      <style>{`
        .loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 400px;
        }

        .football {
          font-size: 50px;
          animation: bounce 0.6s infinite alternate ease-in;
        }

        .shadow {
          width: 40px;
          height: 8px;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          animation: shrink 0.6s infinite alternate ease-in;
        }

        @keyframes bounce {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(-60px) rotate(180deg);
          }
        }

        @keyframes shrink {
          0% {
            transform: scale(1);
            opacity: 0.4;
          }
          100% {
            transform: scale(0.6);
            opacity: 0.1;
          }
        }
      `}</style>
      <div class="football">⚽</div>
      <div class="shadow"></div>
    </div>
  )
}