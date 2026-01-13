function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const submitSelectedIds = async (selectedIds) => {
  await delay(500);
  
  const timestamp = new Date().toISOString();
  console.log('📤 POST /api/selected-ids', {
    ids: selectedIds,
    count: selectedIds.length,
    timestamp: timestamp
  });
  
  const response = {
    success: true,
    message: `${selectedIds.length} ID başarıyla gönderildi`,
    data: {
      ids: selectedIds,
      timestamp: timestamp
    }
  };
  
  return response;
};

export const loadRFMData = async () => {
  try {
    const res = await fetch('/data.json');
    if (!res.ok) {
      throw new Error('Veri yüklenemedi');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('RFM verisi yüklenirken hata:', error);
    throw error;
  }
};

