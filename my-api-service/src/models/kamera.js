import mongoose from 'mongoose';

const kameraSchema = new mongoose.Schema(
  {
    merk_kamera: {
      type: String,
      required: [true, 'merk_kamera wajib diisi'],
      trim: true,
    },
    tipe_kamera: {
      type: String,
      required: [true, 'tipe_kamera wajib diisi'],
      trim: true,
    },
    harga: {
      type: Number,
      required: [true, 'harga wajib diisi'],
      min: [0, 'harga tidak boleh negatif'],
    },
  },
  { timestamps: true }
);


const Kamera = mongoose.model('Kamera', kameraSchema, 'kamera');
export default Kamera;