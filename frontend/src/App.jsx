import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import toiletLogo from './assets/toilet.png';

function App() {
  const [selectedToilet, setSelectedToilet] = useState(null);

  // Contoh data toilet
  const toilets = [
    {
      id: 1,
      name: 'Toilet Taman Mini',
      location: 'Lantai 1, dekat gerbang utama',
      type: 'Duduk',
      avgQueue: 8,
      gender: 'Keduanya',
      overallRating: 3.9,
      position: [-6.302500, 106.895000],
      reviews: [
        { reviewer: 'Ahmad', rating: 4, text: 'Cukup bersih untuk tempat wisata', queue: 6 },
        { reviewer: 'Sinta', rating: 3, text: 'Kadang ramai saat weekend', queue: 12 },
        { reviewer: 'Bayu', rating: 4, text: 'Air lancar dan sabun tersedia', queue: 7 },
        { reviewer: 'Eka', rating: 4, text: 'Petugas membersihkan rutin', queue: 5 },
        { reviewer: 'Doni', rating: 3, text: 'Kurang ventilasi', queue: 9 },
        { reviewer: 'Fitri', rating: 4, text: 'Toilet cukup luas', queue: 8 },
        { reviewer: 'Hendra', rating: 4, text: 'Lampu cukup terang', queue: 6 },
        { reviewer: 'Indah', rating: 3, text: 'Perlu perbaikan kunci pintu', queue: 10 },
        { reviewer: 'Kardi', rating: 4, text: 'Cukup nyaman digunakan', queue: 7 },
        { reviewer: 'Lili', rating: 4, text: 'Bersih dan wangi', queue: 5 }
      ]
    },
    {
      id: 2,
      name: 'Toilet Kota Kasablanka',
      location: 'Lantai 2, dekat bioskop',
      type: 'Duduk',
      avgQueue: 5,
      gender: 'Keduanya',
      overallRating: 4.3,
      position: [-6.224100, 106.841900],
      reviews: [
        { reviewer: 'Maya', rating: 5, text: 'Toilet mall terbaik', queue: 3 },
        { reviewer: 'Niko', rating: 4, text: 'Bersih dan modern', queue: 4 },
        { reviewer: 'Olla', rating: 5, text: 'Petugas sangat ramah', queue: 2 },
        { reviewer: 'Pandu', rating: 4, text: 'Air panas tersedia', queue: 5 },
        { reviewer: 'Qory', rating: 4, text: 'Tisu selalu terisi', queue: 4 },
        { reviewer: 'Reza', rating: 5, text: 'Sangat nyaman dan bersih', queue: 3 },
        { reviewer: 'Sari', rating: 4, text: 'Kadang antri pas weekend', queue: 7 },
        { reviewer: 'Toni', rating: 4, text: 'Fasilitas lengkap', queue: 5 },
        { reviewer: 'Udin', rating: 5, text: 'Toilet premium', queue: 2 },
        { reviewer: 'Vera', rating: 4, text: 'Cukup luas dan bersih', queue: 4 }
      ]
    },
    {
      id: 3,
      name: 'Toilet Terminal Kampung Rambutan',
      location: 'Lantai dasar, sayap kiri',
      type: 'Jongkok',
      avgQueue: 12,
      gender: 'Laki-laki',
      overallRating: 3.2,
      position: [-6.314400, 106.877800],
      reviews: [
        { reviewer: 'Wahyu', rating: 3, text: 'Kurang bersih tapi masih layak', queue: 10 },
        { reviewer: 'Yogi', rating: 3, text: 'Sering antri panjang', queue: 15 },
        { reviewer: 'Zaki', rating: 4, text: 'Air lancar meski kadang keruh', queue: 8 },
        { reviewer: 'Arif', rating: 3, text: 'Perlu renovasi menyeluruh', queue: 12 },
        { reviewer: 'Beni', rating: 2, text: 'Bau tidak sedap', queue: 14 },
        { reviewer: 'Chandra', rating: 4, text: 'Petugas cukup responsif', queue: 9 },
        { reviewer: 'Dimas', rating: 3, text: 'Toilet standar terminal', queue: 11 },
        { reviewer: 'Edy', rating: 3, text: 'Kadang sabun habis', queue: 13 },
        { reviewer: 'Fandi', rating: 4, text: 'Cukup untuk keperluan darurat', queue: 10 },
        { reviewer: 'Galih', rating: 3, text: 'Perlu perawatan lebih baik', queue: 12 }
      ]
    },
    {
      id: 4,
      name: 'Toilet Senayan City',
      location: 'Lantai UG, dekat foodcourt',
      type: 'Duduk',
      avgQueue: 3,
      gender: 'Perempuan',
      overallRating: 4.6,
      position: [-6.226700, 106.799400],
      reviews: [
        { reviewer: 'Hanifa', rating: 5, text: 'Toilet mewah dengan fasilitas lengkap', queue: 2 },
        { reviewer: 'Ines', rating: 5, text: 'Sangat bersih dan wangi', queue: 1 },
        { reviewer: 'Jihan', rating: 4, text: 'Musik lembut membuat nyaman', queue: 3 },
        { reviewer: 'Kirana', rating: 5, text: 'Hand dryer berfungsi baik', queue: 2 },
        { reviewer: 'Luna', rating: 4, text: 'Cermin besar dan bersih', queue: 4 },
        { reviewer: 'Melia', rating: 5, text: 'Area powder room tersedia', queue: 2 },
        { reviewer: 'Nadia', rating: 5, text: 'Toilet terfavorit di Jakarta', queue: 1 },
        { reviewer: 'Okta', rating: 4, text: 'Kadang ramai saat sale', queue: 5 },
        { reviewer: 'Putri', rating: 5, text: 'Petugas sangat ramah', queue: 2 },
        { reviewer: 'Quincy', rating: 4, text: 'Fasilitas bayi tersedia', queue: 3 }
      ]
    },
    {
      id: 5,
      name: 'Toilet Pasar Tanah Abang',
      location: 'Lantai 2, blok A',
      type: 'Jongkok',
      avgQueue: 15,
      gender: 'Perempuan',
      overallRating: 2.8,
      position: [-6.171100, 106.811700],
      reviews: [
        { reviewer: 'Ratna', rating: 3, text: 'Kondisi seadanya tapi bisa dipakai', queue: 12 },
        { reviewer: 'Siska', rating: 2, text: 'Sangat kotor dan bau', queue: 18 },
        { reviewer: 'Tuti', rating: 3, text: 'Air sering mati', queue: 15 },
        { reviewer: 'Ulfa', rating: 3, text: 'Antrian selalu panjang', queue: 20 },
        { reviewer: 'Vivi', rating: 2, text: 'Tidak ada sabun dan tisu', queue: 16 },
        { reviewer: 'Wati', rating: 4, text: 'Sudah diperbaiki sedikit', queue: 8 },
        { reviewer: 'Yayah', rating: 2, text: 'Pintu rusak tidak bisa dikunci', queue: 17 },
        { reviewer: 'Zahra', rating: 3, text: 'Petugas jarang terlihat', queue: 14 },
        { reviewer: 'Aida', rating: 3, text: 'Lantai licin dan kotor', queue: 13 },
        { reviewer: 'Bunga', rating: 2, text: 'Perlu renovasi total', queue: 19 }
      ]
    },
    {
      id: 6,
      name: 'Toilet Mall Kelapa Gading',
      location: 'Lantai 1, dekat entrance A',
      type: 'Duduk',
      avgQueue: 4,
      gender: 'Keduanya',
      overallRating: 4.4,
      position: [-6.158300, 106.905600],
      reviews: [
        { reviewer: 'Citra', rating: 5, text: 'Toilet sangat bersih dan harum', queue: 2 },
        { reviewer: 'Dedy', rating: 4, text: 'Fasilitas modern dan lengkap', queue: 3 },
        { reviewer: 'Elsa', rating: 4, text: 'Petugas cleaning rutin', queue: 4 },
        { reviewer: 'Faisal', rating: 5, text: 'Air panas dan dingin tersedia', queue: 2 },
        { reviewer: 'Gina', rating: 4, text: 'Ruang ganti bayi ada', queue: 5 },
        { reviewer: 'Haris', rating: 4, text: 'Toilet luas dan nyaman', queue: 4 },
        { reviewer: 'Ira', rating: 5, text: 'Tisu berkualitas baik', queue: 2 },
        { reviewer: 'Joko', rating: 4, text: 'Lighting bagus tidak silau', queue: 3 },
        { reviewer: 'Kania', rating: 5, text: 'Hand sanitizer tersedia', queue: 1 },
        { reviewer: 'Lucky', rating: 4, text: 'Cukup untuk mall besar', queue: 4 }
      ]
    },
    {
      id: 7,
      name: 'Toilet Stasiun Cikini',
      location: 'Peron 1, dekat loket',
      type: 'Duduk',
      avgQueue: 9,
      gender: 'Laki-laki',
      overallRating: 3.5,
      position: [-6.195000, 106.847800],
      reviews: [
        { reviewer: 'Malik', rating: 4, text: 'Cukup bersih untuk stasiun', queue: 7 },
        { reviewer: 'Nando', rating: 3, text: 'Kadang ramai jam sibuk', queue: 12 },
        { reviewer: 'Oscar', rating: 4, text: 'Air lancar dan sabun ada', queue: 6 },
        { reviewer: 'Prabowo', rating: 3, text: 'Ventilasi kurang baik', queue: 10 },
        { reviewer: 'Qomar', rating: 4, text: 'Petugas rajin membersihkan', queue: 8 },
        { reviewer: 'Rio', rating: 3, text: 'Lampu kadang mati', queue: 9 },
        { reviewer: 'Surya', rating: 4, text: 'Toilet cukup layak', queue: 7 },
        { reviewer: 'Taufik', rating: 3, text: 'Perlu renovasi minor', queue: 11 },
        { reviewer: 'Usman', rating: 4, text: 'Lokasi strategis', queue: 8 },
        { reviewer: 'Vito', rating: 3, text: 'Standar toilet stasiun', queue: 9 }
      ]
    },
    {
      id: 8,
      name: 'Toilet Cipinang Indah Mall',
      location: 'Lantai 2, food court area',
      type: 'Duduk',
      avgQueue: 6,
      gender: 'Keduanya',
      overallRating: 4.1,
      position: [-6.214400, 106.889700],
      reviews: [
        { reviewer: 'Winda', rating: 4, text: 'Bersih dan terawat baik', queue: 5 },
        { reviewer: 'Yanto', rating: 4, text: 'Fasilitas cukup lengkap', queue: 4 },
        { reviewer: 'Zulfa', rating: 5, text: 'Petugas sangat ramah', queue: 3 },
        { reviewer: 'Agung', rating: 4, text: 'Air hangat tersedia', queue: 6 },
        { reviewer: 'Bella', rating: 4, text: 'Toilet family friendly', queue: 5 },
        { reviewer: 'Catur', rating: 4, text: 'Tisu selalu terisi penuh', queue: 4 },
        { reviewer: 'Diana', rating: 5, text: 'Toilet terbersih di area ini', queue: 2 },
        { reviewer: 'Erik', rating: 4, text: 'Kadang antri saat makan siang', queue: 8 },
        { reviewer: 'Fira', rating: 4, text: 'Cermin besar dan jernih', queue: 5 },
        { reviewer: 'Guntur', rating: 4, text: 'Cukup nyaman untuk keluarga', queue: 6 }
      ]
    },
    {
      id: 9,
      name: 'Toilet Bandara Halim',
      location: 'Terminal domestik, gate 5',
      type: 'Duduk',
      avgQueue: 7,
      gender: 'Keduanya',
      overallRating: 4.2,
      position: [-6.266700, 106.891100],
      reviews: [
        { reviewer: 'Heni', rating: 5, text: 'Toilet bandara standar internasional', queue: 4 },
        { reviewer: 'Ivan', rating: 4, text: 'Bersih dan modern', queue: 6 },
        { reviewer: 'Jess', rating: 4, text: 'Hand dryer berfungsi baik', queue: 5 },
        { reviewer: 'Kevin', rating: 4, text: 'Akses mudah dari gate', queue: 7 },
        { reviewer: 'Lina', rating: 5, text: 'Petugas cleaning aktif', queue: 3 },
        { reviewer: 'Mario', rating: 4, text: 'Fasilitas disable friendly', queue: 6 },
        { reviewer: 'Nina', rating: 4, text: 'Toilet paper berkualitas', queue: 8 },
        { reviewer: 'Oki', rating: 5, text: 'Sangat bersih dan harum', queue: 2 },
        { reviewer: 'Paula', rating: 4, text: 'Area baby changing tersedia', queue: 7 },
        { reviewer: 'Randi', rating: 4, text: 'Cukup luas dan nyaman', queue: 6 }
      ]
    },
    {
      id: 10,
      name: 'Toilet Universitas Indonesia',
      location: 'Fakultas Teknik, lantai 2',
      type: 'Jongkok',
      avgQueue: 8,
      gender: 'Laki-laki',
      overallRating: 3.6,
      position: [-6.361700, 106.828900],
      reviews: [
        { reviewer: 'Satria', rating: 4, text: 'Untuk toilet kampus cukup baik', queue: 6 },
        { reviewer: 'Tegar', rating: 3, text: 'Kadang kotor saat jam sibuk', queue: 10 },
        { reviewer: 'Umar', rating: 4, text: 'Air selalu lancar', queue: 7 },
        { reviewer: 'Vandra', rating: 3, text: 'Perlu maintenance lebih rutin', queue: 9 },
        { reviewer: 'Wisnu', rating: 4, text: 'Lokasi strategis di fakultas', queue: 8 },
        { reviewer: 'Yoga', rating: 3, text: 'Ventilasi kurang optimal', queue: 8 },
        { reviewer: 'Zainal', rating: 4, text: 'Sabun sering tersedia', queue: 5 },
        { reviewer: 'Arya', rating: 4, text: 'Toilet standar universitas', queue: 7 },
        { reviewer: 'Bagas', rating: 3, text: 'Perlu renovasi minor', queue: 9 },
        { reviewer: 'Cahyo', rating: 4, text: 'Cukup untuk kebutuhan mahasiswa', queue: 6 }
      ]
    },
    {
      id: 11,
      name: 'Toilet Mal Puri Indah',
      location: 'Lantai 3, wing barat',
      type: 'Duduk',
      avgQueue: 5,
      gender: 'Perempuan',
      overallRating: 4.3,
      position: [-6.178300, 106.734400],
      reviews: [
        { reviewer: 'Dara', rating: 5, text: 'Toilet sangat bersih dan wangi', queue: 3 },
        { reviewer: 'Evi', rating: 4, text: 'Fasilitas lengkap dan modern', queue: 4 },
        { reviewer: 'Fani', rating: 4, text: 'Petugas ramah dan responsif', queue: 5 },
        { reviewer: 'Gita', rating: 5, text: 'Hand lotion tersedia', queue: 2 },
        { reviewer: 'Hana', rating: 4, text: 'Musik latar yang menenangkan', queue: 6 },
        { reviewer: 'Ika', rating: 5, text: 'Area makeup tersedia', queue: 3 },
        { reviewer: 'Juni', rating: 4, text: 'Toilet luas dan nyaman', queue: 5 },
        { reviewer: 'Karin', rating: 4, text: 'Cermin dengan lampu bagus', queue: 4 },
        { reviewer: 'Lely', rating: 5, text: 'Tisu dan hand sanitizer selalu ada', queue: 2 },
        { reviewer: 'Mira', rating: 4, text: 'Kadang ramai weekend', queue: 7 }
      ]
    },
    {
      id: 12,
      name: 'Toilet RS Cipto Mangunkusumo',
      location: 'Gedung A, lantai 1',
      type: 'Duduk',
      avgQueue: 10,
      gender: 'Keduanya',
      overallRating: 3.8,
      position: [-6.191700, 106.831100],
      reviews: [
        { reviewer: 'Nita', rating: 4, text: 'Bersih untuk toilet rumah sakit', queue: 8 },
        { reviewer: 'Ovi', rating: 4, text: 'Petugas rajin membersihkan', queue: 9 },
        { reviewer: 'Pino', rating: 3, text: 'Kadang antri panjang', queue: 12 },
        { reviewer: 'Queen', rating: 4, text: 'Hand sanitizer banyak tersedia', queue: 7 },
        { reviewer: 'Rini', rating: 4, text: 'Akses wheelchair friendly', queue: 10 },
        { reviewer: 'Sani', rating: 3, text: 'Perlu renovasi beberapa bagian', queue: 11 },
        { reviewer: 'Tika', rating: 4, text: 'Air bersih dan lancar', queue: 8 },
        { reviewer: 'Uci', rating: 4, text: 'Lighting cukup terang', queue: 9 },
        { reviewer: 'Vega', rating: 3, text: 'Kadang bau desinfektan menyengat', queue: 10 },
        { reviewer: 'Wulan', rating: 4, text: 'Toilet cukup layak', queue: 8 }
      ]
    },
    {
      id: 13,
      name: 'Toilet Taman Suropati',
      location: 'Dekat area bermain anak',
      type: 'Jongkok',
      avgQueue: 6,
      gender: 'Keduanya',
      overallRating: 3.4,
      position: [-6.201100, 106.835000],
      reviews: [
        { reviewer: 'Yuda', rating: 3, text: 'Toilet taman pada umumnya', queue: 5 },
        { reviewer: 'Zara', rating: 4, text: 'Cukup bersih untuk fasilitas publik', queue: 4 },
        { reviewer: 'Aldi', rating: 3, text: 'Air kadang keruh', queue: 7 },
        { reviewer: 'Bunga', rating: 4, text: 'Petugas taman cukup responsif', queue: 6 },
        { reviewer: 'Ciko', rating: 3, text: 'Perlu perbaikan atap', queue: 8 },
        { reviewer: 'Dita', rating: 4, text: 'Lokasi mudah ditemukan', queue: 5 },
        { reviewer: 'Egi', rating: 3, text: 'Sabun sering habis', queue: 6 },
        { reviewer: 'Fika', rating: 3, text: 'Ventilasi alami cukup baik', queue: 7 },
        { reviewer: 'Gani', rating: 4, text: 'Toilet gratis di tengah kota', queue: 4 },
        { reviewer: 'Hilda', rating: 3, text: 'Standar toilet taman kota', queue: 6 }
      ]
    },
    {
      id: 14,
      name: 'Toilet Pacific Place',
      location: 'Lantai 5, luxury zone',
      type: 'Duduk',
      avgQueue: 2,
      gender: 'Keduanya',
      overallRating: 4.8,
      position: [-6.225600, 106.808300],
      reviews: [
        { reviewer: 'Ivan', rating: 5, text: 'Toilet mewah dengan pelayanan premium', queue: 1 },
        { reviewer: 'Jasmine', rating: 5, text: 'Fasilitas bintang 5', queue: 2 },
        { reviewer: 'Kevin', rating: 5, text: 'Hand towel dari katun berkualitas', queue: 1 },
        { reviewer: 'Luna', rating: 4, text: 'Parfum ruangan sangat wangi', queue: 3 },
        { reviewer: 'Marco', rating: 5, text: 'Toilet terbaik di Jakarta', queue: 1 },
        { reviewer: 'Naomi', rating: 5, text: 'Marble countertop dan gold fixture', queue: 2 },
        { reviewer: 'Omar', rating: 5, text: 'Music background klasik', queue: 1 },
        { reviewer: 'Priska', rating: 4, text: 'Attendant selalu standby', queue: 2 },
        { reviewer: 'Queenie', rating: 5, text: 'Lotion dan perfume gratis', queue: 1 },
        { reviewer: 'Rafael', rating: 5, text: 'Pengalaman toilet seperti hotel', queue: 2 }
      ]
    },
    {
      id: 15,
      name: 'Toilet Pasar Minggu',
      location: 'Lantai 2, sektor sayuran',
      type: 'Jongkok',
      avgQueue: 14,
      gender: 'Perempuan',
      overallRating: 2.5,
      position: [-6.285600, 106.845000],
      reviews: [
        { reviewer: 'Siska', rating: 2, text: 'Sangat kotor dan bau', queue: 15 },
        { reviewer: 'Tina', rating: 3, text: 'Air sering mati di siang hari', queue: 12 },
        { reviewer: 'Umi', rating: 2, text: 'Lantai becek dan licin', queue: 16 },
        { reviewer: 'Vina', rating: 3, text: 'Perlu renovasi menyeluruh', queue: 14 },
        { reviewer: 'Wulan', rating: 2, text: 'Pintu rusak tidak bisa dikunci', queue: 18 },
        { reviewer: 'Yuni', rating: 3, text: 'Petugas jarang terlihat', queue: 13 },
        { reviewer: 'Zahra', rating: 2, text: 'Tidak ada sabun dan tisu', queue: 17 },
        { reviewer: 'Andi', rating: 3, text: 'Kondisi memprihatinkan', queue: 15 },
        { reviewer: 'Bulan', rating: 2, text: 'Bau menyengat tidak tertahankan', queue: 19 },
        { reviewer: 'Caca', rating: 3, text: 'Terpaksa pakai karena darurat', queue: 14 }
      ]
    },
    {
      id: 16,
      name: 'Toilet Mall Artha Gading',
      location: 'Lantai 1, dekat supermarket',
      type: 'Duduk',
      avgQueue: 4,
      gender: 'Keduanya',
      overallRating: 4.2,
      position: [-6.143300, 106.906700],
      reviews: [
        { reviewer: 'Dani', rating: 4, text: 'Toilet mall dengan standar baik', queue: 3 },
        { reviewer: 'Ella', rating: 5, text: 'Sangat bersih dan harum', queue: 2 },
        { reviewer: 'Farid', rating: 4, text: 'Fasilitas modern dan terawat', queue: 4 },
        { reviewer: 'Gaby', rating: 4, text: 'Petugas cleaning rutin', queue: 5 },
        { reviewer: 'Hadi', rating: 5, text: 'Air panas dingin tersedia', queue: 2 },
        { reviewer: 'Ines', rating: 4, text: 'Baby changing room ada', queue: 4 },
        { reviewer: 'Jaka', rating: 4, text: 'Tisu berkualitas baik', queue: 3 },
        { reviewer: 'Kiki', rating: 5, text: 'Hand dryer sensor otomatis', queue: 2 },
        { reviewer: 'Lani', rating: 4, text: 'Cermin besar dan bersih', queue: 4 },
        { reviewer: 'Made', rating: 4, text: 'Toilet luas dan nyaman', queue: 3 }
      ]
    },
    {
      id: 17,
      name: 'Toilet Stasiun Tanah Abang',
      location: 'Peron 2, tengah',
      type: 'Duduk',
      avgQueue: 11,
      gender: 'Laki-laki',
      overallRating: 3.3,
      position: [-6.171700, 106.812800],
      reviews: [
        { reviewer: 'Nando', rating: 3, text: 'Standar toilet stasiun ramai', queue: 9 },
        { reviewer: 'Oki', rating: 4, text: 'Sudah direnovasi tahun ini', queue: 8 },
        { reviewer: 'Pandu', rating: 3, text: 'Air lancar tapi kadang keruh', queue: 12 },
        { reviewer: 'Qiqi', rating: 3, text: 'Antri panjang jam sibuk', queue: 15 },
        { reviewer: 'Rudi', rating: 4, text: 'Petugas cukup responsif', queue: 10 },
        { reviewer: 'Sandi', rating: 3, text: 'Ventilasi masih kurang', queue: 11 },
        { reviewer: 'Toni', rating: 4, text: 'Sabun dispenser berfungsi', queue: 8 },
        { reviewer: 'Udin', rating: 3, text: 'Perlu perawatan lebih rutin', queue: 13 },
        { reviewer: 'Vito', rating: 3, text: 'Lampu cukup terang', queue: 11 },
        { reviewer: 'Wawan', rating: 4, text: 'Lokasi mudah ditemukan', queue: 9 }
      ]
    }
  ];

  // Custom icon toilet yang lebih kontras
  const toiletIcon = new L.Icon({
    iconUrl: toiletLogo,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
    className: ''
  });

  // Icon toilet untuk marker yang sedang dipilih (lebih besar & outline biru navy)
  const toiletIconActive = new L.Icon({
    iconUrl: toiletLogo,
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    popupAnchor: [0, -48],
    className: 'toilet-marker-active' // bisa digunakan untuk custom CSS jika ingin efek lebih
  });

  // Komponen Marker dengan event klik
  function ToiletMarker({ toilet }) {
    const isActive = selectedToilet && selectedToilet.id === toilet.id;
    return (
      <Marker
        position={toilet.position}
        icon={isActive ? toiletIconActive : toiletIcon}
        eventHandlers={{
          click: () => setSelectedToilet(toilet)
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-[#1a2746] ml-2 tracking-tight">Jambanow</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-white border border-[#1a2746] text-[#1a2746] font-medium px-4 py-2 rounded hover:bg-[#f3f6fa] transition">Login</button>
          <button className="bg-[#1a2746] text-white font-medium px-4 py-2 rounded hover:bg-[#223366] transition">Register</button>
        </div>
      </header>
      <main className="flex-1 flex flex-col md:flex-row items-stretch justify-center p-0 m-0 bg-white">
        <div className="flex-1 h-[60vh] md:h-[80vh] rounded-lg border border-gray-200 shadow-sm overflow-hidden mt-6 max-w-5xl md:max-w-3xl mx-auto md:mx-6 bg-white">
          <MapContainer center={[-6.200000, 106.816666]} zoom={15} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {toilets.map((toilet) => (
              <ToiletMarker key={toilet.id} toilet={toilet} />
            ))}
          </MapContainer>
        </div>
        <div className="w-full md:w-[400px] bg-white border border-gray-200 rounded-lg shadow-sm mt-6 md:mt-6 mx-auto md:mx-0 p-6 flex flex-col min-h-[60vh] md:min-h-[80vh]">
          {selectedToilet ? (
            <>
              <div className="font-bold text-[#1a2746] text-xl mb-1">{selectedToilet.name}</div>
              <div className="mb-1 text-gray-700 text-sm">{selectedToilet.location}</div>
              <div className="mb-1 text-xs text-gray-600">Jenis: <span className="font-semibold">{selectedToilet.type}</span> | Gender: <span className="font-semibold">{selectedToilet.gender}</span></div>
              <div className="mb-1 text-xs text-gray-600">Rata-rata antrian: <span className="font-semibold">{selectedToilet.avgQueue} menit</span></div>
              <div className="mb-2 text-xs text-[#1a2746]">Rating: <span className="font-bold">{selectedToilet.overallRating} / 5</span></div>
              <div className="font-semibold text-sm text-[#1a2746] mb-1 mt-2">Review:</div>
              <ul className="list-disc list-inside text-xs text-gray-600">
                {selectedToilet.reviews.map((review, idx) => (
                  <li key={idx} className="mb-2">
                    <span className="font-bold text-[#1a2746]">{review.reviewer}</span> -
                    <span className="text-[#1a2746]">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span> -
                    <span className="italic">{review.text}</span> <br />
                    <span className="text-gray-400">Antrian: {review.queue} menit</span>
                  </li>
                ))}
              </ul>
              <button className="mt-4 w-full bg-[#1a2746] hover:bg-[#223366] text-white font-medium py-2 px-4 rounded transition mb-2">Tambah Review</button>
              <button className="w-full bg-white border border-[#1a2746] text-[#1a2746] font-medium py-2 px-4 rounded hover:bg-[#f3f6fa] transition">Ajukan Perubahan Data Toilet</button>
            </>
          ) : (
            <div className="text-gray-400 text-center my-auto">Klik marker toilet pada peta untuk melihat detail.</div>
          )}
        </div>
      </main>
      <footer className="w-full border-t border-gray-200 bg-white py-6 mt-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-2">
          <div className="text-[#1a2746] font-bold text-lg tracking-tight">Jambanow</div>
          <div className="text-xs text-gray-500 text-center md:text-right">
            &copy; {new Date().getFullYear()} Jambanow (MVP). Created by <span className="font-semibold">Kebelet Lulus Nilai Bagus</span> Team.<br />
            Powered by React, Vite, Leaflet, and OpenStreetMap.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
