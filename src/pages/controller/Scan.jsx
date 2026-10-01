import React, { useEffect, useState, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Smartphone, MonitorX } from "lucide-react";
import ScanActiveView from "../../Components/scanner/ScanActiveView";

export default function TicketScanner() {
  const [scanState, setScanState] = useState("scanning"); // 'scanning' | 'valid' | 'already_used' | 'invalid'
  const [ticketData, setTicketData] = useState(null);
  const [isMobileDevice, setIsMobileDevice] = useState(true);
  
  const scannerRef = useRef(null);
  const ELEMENT_ID = "reader-container";

  // 1. Détection mobile / tablette vs PC
  useEffect(() => {
    const checkDevice = () => {
      // Vérification simple via le User Agent ou la largeur tactile
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
      
      // Alternative complémentaire : vérifier si l'appareil supporte le tactile ou a un écran réduit
      const isTouchScreen = navigator.maxTouchPoints > 0;

      // On autorise si c'est explicitement un mobile ou un écran tactile mobile
      if (!isMobile && !isTouchScreen && window.innerWidth > 1024) {
        setIsMobileDevice(false);
      }
    };

    checkDevice();
  }, []);

  // Gestion de la simulation (pour tester les écrans)
  const handleSimulateScan = (type) => {
    stopScanner(() => {
      if (type === "valid") {
        setTicketData({
          holder_name: "Kofi Mensah",
          category: "VIP",
          code: "FTV-2026-001",
          event_title: "Afrobeats Night",
          scanned_at: "12:11:47",
        });
        setScanState("valid");
      } else if (type === "already_used") {
        setScanState("already_used");
      } else {
        setScanState("invalid");
      }
    });
  };

  const stopScanner = (callback) => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      scannerRef.current
        .stop()
        .then(() => {
          scannerRef.current.clear();
          scannerRef.current = null;
          if (callback) callback();
        })
        .catch(() => {
          if (callback) callback();
        });
    } else {
      if (callback) callback();
    }
  };

  // 2. Démarrage de la caméra (uniquement sur mobile/tablette)
  useEffect(() => {
    if (scanState === "scanning" && isMobileDevice) {
      const timer = setTimeout(() => {
        const container = document.getElementById(ELEMENT_ID);
        if (!container) return;

        const html5QrCode = new Html5Qrcode(ELEMENT_ID);
        scannerRef.current = html5QrCode;

        html5QrCode
          .start(
            { facingMode: "environment" }, // Caméra arrière par défaut
            { 
              fps: 10, 
              qrbox: { width: 230, height: 230 },
              aspectRatio: 1.0
            },
            (decodedText) => {
              console.log("QR Code détecté :", decodedText);
              // Ici tu brancheras ton hook API de scan plus tard
            },
            (errorMessage) => {
              // Erreurs de frame ignorées (normales en continu)
            }
          )
          .catch((err) => {
            console.error("Erreur d'accès à la caméra :", err);
            alert("Impossible d'accéder à la caméra. Vérifiez les autorisations du navigateur.");
          });
      }, 200);

      return () => {
        clearTimeout(timer);
        if (scannerRef.current && scannerRef.current.isScanning) {
          scannerRef.current.stop().catch(() => {});
        }
      };
    }
  }, [scanState, isMobileDevice]);

  const handleReset = () => {
    setTicketData(null);
    setScanState("scanning");
  };

  // Si l'utilisateur est sur PC, on bloque l'accès avec un message dédié
  if (!isMobileDevice) {
    return (
      <div className="w-full max-w-md mx-auto min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
        <div className="w-20 h-20 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shadow-sm">
          <MonitorX size={36} />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Accès restreint aux mobiles</h2>
        <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
          Le module de scan de billets est conçu exclusivement pour les smartphones et tablettes des agents de contrôle à l'entrée.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col justify-between pb-8 pt-2">
      {scanState === "scanning" && (
        <ScanActiveView elementId={ELEMENT_ID} onSimulate={handleSimulateScan} />
      )}

      {scanState === "valid" && (
        <ScanInvalidResult ticket={ticketData} onNext={handleReset} />
      )}

      {scanState === "already_used" && (
        <ScanAlreadyUsedResult onRetry={handleReset} />
      )}

      {scanState === "invalid" && (
        <ScanInvalidResult onRetry={handleReset} />
      )}
    </div>
  );
}