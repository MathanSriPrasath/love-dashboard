# 📦 Installation Instructions - Image Cropping Feature

## Overview
The Love Dashboard now includes **WhatsApp-style image cropping** for:
- ✅ Couple Photos (circular crop)
- ✅ Memory Photos (circular crop)

## What Was Added

### 1. New Package: `react-easy-crop`
A powerful React component for cropping images with zoom and drag functionality.

### 2. New Files Created:
```
frontend/src/
├── components/
│   ├── ImageCropModal.js          # Main crop modal component
│   └── ImageCropModal.css         # Styling for crop modal
└── utils/
    └── cropImage.js               # Image cropping utility functions
```

### 3. Updated Files:
- `frontend/src/pages/Dashboard.js` - Added crop functionality for couple & memory photos
- `frontend/package.json` - Added react-easy-crop dependency

## Installation Steps

### For Existing Installations:

1. **Navigate to frontend directory:**
   ```bash
   cd "path/to/love-dashboard/frontend"
   ```

2. **Install the new packages:**
   ```bash
   npm install react-easy-crop normalize-wheel
   ```

3. **Restart the frontend server:**
   ```bash
   npm start
   ```

### For Fresh Installations:

Simply run `npm install` in the frontend directory - the `package.json` already includes `react-easy-crop`.

```bash
cd "path/to/love-dashboard/frontend"
npm install
npm start
```

## How It Works

### Couple Photo Upload:
1. Click the 📷 camera icon on the couple photo
2. Select an image from your device
3. **Crop Modal appears** - drag to reposition, scroll to zoom
4. Click "Confirm" to save the cropped image
5. Image uploads automatically to the server

### Memory Photo Upload:
1. Click "Add New Memory"
2. In the form, click "📷 Upload Photo"
3. Select an image from your device
4. **Crop Modal appears** - drag to reposition, scroll to zoom
5. Click "Confirm" to save the cropped image
6. Fill in the rest of the memory details
7. Click "Add Memory" to save

## Features

✨ **Circular Crop** - Photos are cropped in a perfect circle (aspect ratio 1:1)  
✨ **Drag & Reposition** - Move the image around to frame it perfectly  
✨ **Zoom Control** - Scroll or use the slider to zoom in/out (1x - 3x)  
✨ **Visual Preview** - See exactly what your cropped image will look like  
✨ **Cancel Anytime** - Close the modal to start over  
✨ **File Size Optimization** - Cropped images are compressed as JPEG at 95% quality  

## Technical Details

### Image Processing:
- Images are cropped using HTML5 Canvas API
- Output format: JPEG with 95% quality
- Maximum input size: 10MB (before crop)
- Maximum output size: ~5MB (after crop and compression)

### Supported Formats:
- **Input**: JPG, JPEG, PNG
- **Output**: JPEG (optimized for web)

### Browser Compatibility:
Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## Troubleshooting

### Issue: "react-easy-crop not found" or "can't resolve 'normalize-wheel'"
**Solution:** Run `npm install react-easy-crop normalize-wheel` in the frontend directory

### Issue: Image not uploading after crop
**Solution:** 
1. Check that the backend is running on `http://localhost:8080`
2. Verify the `uploads/` directory exists in the backend folder
3. Check browser console for errors

### Issue: Crop modal not appearing
**Solution:**
1. Clear browser cache
2. Restart the frontend server
3. Check browser console for errors

### Issue: Image quality is poor after crop
**Solution:** 
- The compression quality is set to 95% in `cropImage.js`
- You can adjust this in `frontend/src/utils/cropImage.js` line 78:
  ```javascript
  croppedCanvas.toBlob((blob) => {
    // ...
  }, 'image/jpeg', 0.95); // Change 0.95 to 1.0 for maximum quality
  ```

## Future Enhancements

Potential improvements for the crop feature:
- [ ] Add rotation controls
- [ ] Add filters (black & white, sepia, etc.)
- [ ] Allow rectangular crops for memory photos
- [ ] Add brightness/contrast adjustments
- [ ] Support for custom aspect ratios

---

**Enjoy your enhanced Love Dashboard! 💕**

