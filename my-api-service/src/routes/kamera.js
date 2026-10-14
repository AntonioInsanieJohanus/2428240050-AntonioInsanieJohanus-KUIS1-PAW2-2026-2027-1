import { Router } from 'express';
import mongoose from 'mongoose';
import Kamera from '../models/kamera.js';

const router = Router();
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

router.post('/', async (req, res) => {
  try {
    const { merk_kamera, tipe_kamera, harga } = req.body;
    const data = await Kamera.create({ merk_kamera, tipe_kamera, harga });
    res.status(201).json({ success: true, message: 'Data kamera berhasil ditambahkan', data });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: err.message });
    }
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server' });
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await Kamera.find();
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'ID tidak valid' });
    }
    const data = await Kamera.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ success: false, message: 'Data kamera tidak ditemukan' });
    }
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'ID tidak valid' });
    }
    const { merk_kamera, tipe_kamera, harga } = req.body;
    const data = await Kamera.findByIdAndUpdate(
      req.params.id,
      { merk_kamera, tipe_kamera, harga },
      { new: true, runValidators: true }
    );
    if (!data) {
      return res.status(404).json({ success: false, message: 'Data kamera tidak ditemukan' });
    }
    res.status(200).json({ success: true, message: 'Data kamera berhasil diperbarui', data });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: err.message });
    }
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'ID tidak valid' });
    }
    const data = await Kamera.findByIdAndDelete(req.params.id);
    if (!data) {
      return res.status(404).json({ success: false, message: 'Data kamera tidak ditemukan' });
    }
    res.status(200).json({ success: true, message: 'Data kamera berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server' });
  }
});

export default router;