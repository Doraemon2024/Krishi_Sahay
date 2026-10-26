/**
 * Comprehensive Agricultural Locations Directory of India
 * All 28 States & 8 Union Territories with primary farming hubs and coordinates
 */
const INDIA_LOCATIONS = [
  // --- North Zone ---
  { id: 'punjab', name: 'Punjab (Ludhiana / Amritsar)', state: 'Punjab', zone: 'North', lat: 30.9010, lon: 75.8573, cropHub: 'Wheat, Paddy, Cotton' },
  { id: 'haryana', name: 'Haryana (Karnal / Hisar)', state: 'Haryana', zone: 'North', lat: 29.6857, lon: 76.9905, cropHub: 'Basmati Rice, Wheat, Mustard' },
  { id: 'uttar_pradesh', name: 'Uttar Pradesh (Varanasi / Lucknow)', state: 'Uttar Pradesh', zone: 'North', lat: 26.8467, lon: 80.9462, cropHub: 'Sugarcane, Wheat, Potato, Paddy' },
  { id: 'himachal_pradesh', name: 'Himachal Pradesh (Shimla / Kangra)', state: 'Himachal Pradesh', zone: 'North', lat: 31.1048, lon: 77.1734, cropHub: 'Apple, Maize, Stone Fruits' },
  { id: 'uttarakhand', name: 'Uttarakhand (Pantnagar / Dehradun)', state: 'Uttarakhand', zone: 'North', lat: 29.0222, lon: 79.4908, cropHub: 'Basmati, Pulses, Millets' },
  { id: 'jammu_kashmir', name: 'Jammu & Kashmir (Srinagar / Jammu)', state: 'Jammu & Kashmir', zone: 'North', lat: 34.0837, lon: 74.7973, cropHub: 'Saffron, Apple, Walnut, Rice' },
  { id: 'ladakh', name: 'Ladakh (Leh)', state: 'Ladakh', zone: 'North', lat: 34.1526, lon: 77.5771, cropHub: 'Barley, Apricot, Buckwheat' },
  { id: 'delhi', name: 'Delhi (IARI Pusa / Najafgarh)', state: 'Delhi', zone: 'North', lat: 28.6139, lon: 77.2090, cropHub: 'Vegetables, Floriculture, Wheat' },
  { id: 'chandigarh', name: 'Chandigarh (Peri-Urban Agro)', state: 'Chandigarh', zone: 'North', lat: 30.7333, lon: 76.7794, cropHub: 'Greenhouse Vegetables, Nursery' },

  // --- West Zone ---
  { id: 'maharashtra', name: 'Maharashtra (Nashik / Pune / Nagpur)', state: 'Maharashtra', zone: 'West', lat: 19.9975, lon: 73.7898, cropHub: 'Onion, Grapes, Soybean, Cotton, Orange' },
  { id: 'gujarat', name: 'Gujarat (Anand / Ahmedabad / Rajkot)', state: 'Gujarat', zone: 'West', lat: 22.5645, lon: 72.9289, cropHub: 'Cotton, Groundnut, Cumin, Tobacco' },
  { id: 'rajasthan', name: 'Rajasthan (Jaipur / Kota / Jodhpur)', state: 'Rajasthan', zone: 'West', lat: 26.9124, lon: 75.7873, cropHub: 'Mustard, Bajra, Guar, Spices' },
  { id: 'goa', name: 'Goa (Panaji / Ponda)', state: 'Goa', zone: 'West', lat: 15.4909, lon: 73.8278, cropHub: 'Cashew, Coconut, Areca Nut, Paddy' },
  { id: 'dadra_nagar_daman', name: 'Daman & Diu (Coastal Agro)', state: 'DNH and Daman & Diu', zone: 'West', lat: 20.4283, lon: 72.8397, cropHub: 'Paddy, Pulses, Coconut' },

  // --- South Zone ---
  { id: 'karnataka', name: 'Karnataka (Shimoga / Bengaluru / Hubli)', state: 'Karnataka', zone: 'South', lat: 13.9299, lon: 75.5681, cropHub: 'Areca Nut, Coffee, Ragi, Cotton, Maize' },
  { id: 'andhra_pradesh', name: 'Andhra Pradesh (Guntur / Vijayawada)', state: 'Andhra Pradesh', zone: 'South', lat: 16.3067, lon: 80.4365, cropHub: 'Red Chilli, Paddy, Tobacco, Mango' },
  { id: 'telangana', name: 'Telangana (Warangal / Hyderabad / Nizamabad)', state: 'Telangana', zone: 'South', lat: 17.9689, lon: 79.5941, cropHub: 'Cotton, Paddy, Turmeric, Maize' },
  { id: 'tamil_nadu', name: 'Tamil Nadu (Thanjavur / Coimbatore)', state: 'Tamil Nadu', zone: 'South', lat: 10.7870, lon: 79.1378, cropHub: 'Paddy, Banana, Sugarcane, Coconut' },
  { id: 'kerala', name: 'Kerala (Wayanad / Palakkad / Idukki)', state: 'Kerala', zone: 'South', lat: 11.6854, lon: 76.1320, cropHub: 'Spices, Cardamom, Rubber, Tea, Paddy' },
  { id: 'puducherry', name: 'Puducherry (Karaikal / Puducherry)', state: 'Puducherry', zone: 'South', lat: 11.9416, lon: 79.8083, cropHub: 'Paddy, Sugarcane, Groundnut' },

  // --- Central & East Zone ---
  { id: 'madhya_pradesh', name: 'Madhya Pradesh (Indore / Bhopal / Jabalpur)', state: 'Madhya Pradesh', zone: 'Central & East', lat: 22.7196, lon: 75.8577, cropHub: 'Soybean, Wheat, Gram, Pulses, Garlic' },
  { id: 'chhattisgarh', name: 'Chhattisgarh (Raipur / Bilaspur)', state: 'Chhattisgarh', zone: 'Central & East', lat: 21.2514, lon: 81.6296, cropHub: 'Paddy (Rice Bowl), Maize, Kodo-Kutki' },
  { id: 'bihar', name: 'Bihar (Muzaffarpur / Patna / Purnea)', state: 'Bihar', zone: 'Central & East', lat: 26.1209, lon: 85.3647, cropHub: 'Makhana, Litchi, Maize, Paddy, Wheat' },
  { id: 'west_bengal', name: 'West Bengal (Burdwan / Kolkata / Siliguri)', state: 'West Bengal', zone: 'Central & East', lat: 23.2324, lon: 87.8615, cropHub: 'Paddy, Jute, Tea, Potato' },
  { id: 'odisha', name: 'Odisha (Cuttack / Bhubaneswar / Sambalpur)', state: 'Odisha', zone: 'Central & East', lat: 20.4625, lon: 85.8828, cropHub: 'Paddy, Pulses, Groundnut, Cashew' },
  { id: 'jharkhand', name: 'Jharkhand (Ranchi / Hazaribagh)', state: 'Jharkhand', zone: 'Central & East', lat: 23.3441, lon: 85.3096, cropHub: 'Vegetables, Pulses, Maize, Niger' },

  // --- North-East Zone ---
  { id: 'assam', name: 'Assam (Jorhat / Guwahati / Tezpur)', state: 'Assam', zone: 'North-East', lat: 26.7509, lon: 94.2037, cropHub: 'Tea, Paddy, Jute, Mustard, Areca Nut' },
  { id: 'arunachal_pradesh', name: 'Arunachal Pradesh (Itanagar / Pasighat)', state: 'Arunachal Pradesh', zone: 'North-East', lat: 27.0844, lon: 93.6053, cropHub: 'Kiwi, Orange, Large Cardamom, Rice' },
  { id: 'meghalaya', name: 'Meghalaya (Shillong / Tura)', state: 'Meghalaya', zone: 'North-East', lat: 25.5788, lon: 91.8933, cropHub: 'Lakadong Turmeric, Ginger, Pineapple' },
  { id: 'manipur', name: 'Manipur (Imphal)', state: 'Manipur', zone: 'North-East', lat: 24.8170, lon: 93.9368, cropHub: 'Black Rice (Chak-Hao), Bamboo, Maize' },
  { id: 'mizoram', name: 'Mizoram (Aizawl / Serchhip)', state: 'Mizoram', zone: 'North-East', lat: 23.7271, lon: 92.7176, cropHub: 'Bird’s Eye Chilli, Ginger, Anthurium' },
  { id: 'nagaland', name: 'Nagaland (Kohima / Mokokchung)', state: 'Nagaland', zone: 'North-East', lat: 25.6751, lon: 94.1086, cropHub: 'Naga King Chilli, Organic Passion Fruit, Rice' },
  { id: 'tripura', name: 'Tripura (Agartala)', state: 'Tripura', zone: 'North-East', lat: 23.8315, lon: 91.2868, cropHub: 'Queen Pineapple, Rubber, Tea, Paddy' },
  { id: 'sikkim', name: 'Sikkim (Gangtok / Namchi)', state: 'Sikkim', zone: 'North-East', lat: 27.3389, lon: 88.6065, cropHub: '100% Organic Spices, Large Cardamom, Buckwheat' },

  // --- Islands ---
  { id: 'andaman_nicobar', name: 'Andaman & Nicobar (Port Blair)', state: 'Andaman & Nicobar', zone: 'Islands', lat: 11.6234, lon: 92.7265, cropHub: 'Coconut, Areca Nut, Spices' },
  { id: 'lakshadweep', name: 'Lakshadweep (Kavaratti)', state: 'Lakshadweep', zone: 'Islands', lat: 10.5667, lon: 72.6417, cropHub: 'Coconut, Organic Copra, Marine' }
];

module.exports = INDIA_LOCATIONS;
