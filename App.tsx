import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
  ScrollView,
  View,
  ImageBackground,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

type DishDetails = { name: string; description: string; course: string; price: string };
type DrinkDetails = { name: string; description: string; price: string };
type Booking = { id: string; name: string; phone: string; date: string; people: string };
type Screen = 'Home' | 'Menus' | 'Drinks' | 'Bookings';

const predefinedDishes = [
  { id: '1', name: 'Spaghetti Bolognese' },
  { id: '2', name: 'Caesar Salad' },
  { id: '3', name: 'Grilled Salmon' },
  { id: '4', name: 'Chocolate Lava Cake' },
];

const courseOptions = ['Appetizer', 'Main', 'Dessert'];

const predefinedDrinks = [
  { id: '1', name: 'Red Wine' },
  { id: '2', name: 'Orange Juice' },
  { id: '3', name: 'Classic Flat Wine' },
  { id: '4', name: 'Matcha Latte' },
  { id: '5', name: 'Milkshake' },
  { id: '6', name: 'Green Tea' },
];

const predefinedAppetizers = [
  { id: 'a1', name: 'Tuna Tartare' },
  { id: 'a2', name: 'Lobster Bisque' },
  { id: 'a3', name: 'Garlic Bread' },
  { id: 'a4', name: 'Escargot' },
  { id: 'a5', name: 'Foie gras torchon' },
  { id: 'a6', name: 'Goat cheese Tartlets' },
  { id: 'a7', name: 'Bruschetta' },
];

/*Home Screen*/
function HomeScreen({
  onNavigate,
  menuDetails,
  drinkDetails,
  setMenuDetails,
  setDrinkDetails,
}: {
  onNavigate: (s: Screen) => void;
  menuDetails: Record<string, DishDetails>;
  drinkDetails: Record<string, DrinkDetails>;
  setMenuDetails: React.Dispatch<React.SetStateAction<Record<string, DishDetails>>>;
  setDrinkDetails: React.Dispatch<React.SetStateAction<Record<string, DrinkDetails>>>;
}) {
  const dishes = Object.entries(menuDetails);
  const drinksAndApps = Object.entries(drinkDetails);

  const removeMenuItem = (id: string) => {
    setMenuDetails(prev => {
      const newData = { ...prev };
      delete newData[id];
      return newData;
    });
  };

  const removeDrinkItem = (id: string) => {
    setDrinkDetails(prev => {
      const newData = { ...prev };
      delete newData[id];
      return newData;
    });
  };

  return (
<ImageBackground
  source={require('./assets/homebackground.jpg')}
  style={styles.background}
  resizeMode="cover"
>
  <View style={styles.overlay}>
    {/* Centered Container */}
    <View style={styles.centerContainer}>
      <Text style={styles.title}>Cristoffel's Kitchen: Westville's Premier Diner</Text>

      <View style={styles.homeMenuContainer}>
        <TouchableOpacity style={styles.menuButton} onPress={() => onNavigate('Menus')}>
          <Text style={styles.menuButtonText}>Menus</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => onNavigate('Drinks')}>
          <Text style={styles.menuButtonText}>Drinks & Appetizers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => onNavigate('Bookings')}>
          <Text style={styles.menuButtonText}>Bookings</Text>
        </TouchableOpacity>
      </View>
    </View>

    {/* Scrollable prepared menu and drinks/appetizers below */}
    <ScrollView style={styles.scrollContainer}>
      <Text style={styles.subTitle}>Prepared Menu</Text>
      {dishes.length === 0 ? (
        <Text style={styles.emptyText}>No menu items yet.</Text>
      ) : (
        dishes.map(([id, it]) => (
          <View key={id} style={styles.menuItem}>
            <Text style={styles.menuItemTitle}>{it.name} — {it.course}</Text>
            <Text style={styles.menuItemSubtitle}>{it.description}</Text>
            <Text style={styles.menuItemPrice}>{it.price ? `$${it.price}` : 'Price not set'}</Text>
            <Button title="Remove" onPress={() => removeMenuItem(id)} />
          </View>
        ))
      )}

      <Text style={[styles.subTitle, { marginTop: 20 }]}>Drinks & Appetizers</Text>
      {drinksAndApps.length === 0 ? (
        <Text style={styles.emptyText}>No drinks or appetizers yet.</Text>
      ) : (
        drinksAndApps.map(([id, it]) => (
          <View key={id} style={styles.menuItem}>
            <Text style={styles.menuItemTitle}>{it.name}</Text>
            <Text style={styles.menuItemSubtitle}>{it.description}</Text>
            <Text style={styles.menuItemPrice}>{it.price ? `$${it.price}` : 'Price not set'}</Text>
            <Button title="Remove" onPress={() => removeDrinkItem(id)} />
          </View>
        ))
      )}
    </ScrollView>
  </View>
</ImageBackground>
  );
}

/*Menus Screen*/

function MenusScreen({
  onBack,
  menuDetails,
  setMenuDetails,
}: {
  onBack: () => void;
  menuDetails: Record<string, DishDetails>;
  setMenuDetails: React.Dispatch<React.SetStateAction<Record<string, DishDetails>>>;
}) {
  const [selectedMeal, setSelectedMeal] = useState<'Breakfast' | 'Lunch' | 'Dinner'>('Breakfast');
  const [selectedDishId, setSelectedDishId] = useState<string | null>(null);
  const [tempDish, setTempDish] = useState<DishDetails>({ name: '', description: '', course: 'Breakfast', price: '' });
  const [newDishName, setNewDishName] = useState('');

  const predefinedMap = {
    Breakfast: [
      { id: 'b1', name: 'Eggs Benedict' },
      { id: 'b2', name: 'Bacon Omelette' },
      { id: 'b3', name: 'Bitter Greens Salad' },
      { id: 'b4', name: 'Halloumi Fritata' },
      { id: 'b5', name: 'Seared Scallops' },
      { id: 'b6', name: 'Shakshuka' },
      { id: 'b7', name: 'Smoked Salmon Platter' },
      { id: 'b8', name: 'French Toast' },
      { id: 'b9', name: 'Muesli' },
    ],
    Lunch: [
      { id: 'l1', name: 'Potato Gnocchi' },
      { id: 'l2', name: 'Pan-Roasted Halibut' },
      { id: 'l3', name: 'Risotto Milanese' },
      { id: 'l4', name: 'Tagliatelle al Limone' },
      { id: 'l5', name: 'Chicago Deep Dish Pizza' },
      { id: 'l6', name: 'Chicken Caesar Wrap' },
      { id: 'l7', name: 'Mediterranean Couscous Salad' },
    ],
    Dinner: [
      { id: 'd1', name: 'Filet Mignon' },
      { id: 'd2', name: 'Squid Ink Tagliolini' },
      { id: 'd3', name: 'Lobster Thermidor' },
      { id: 'd4', name: 'Wagyu Ribeye' },
      { id: 'd5', name: 'Lamb Shank Bourguignon' },
      { id: 'd6', name: 'Spinach & Ricotta Tortellini' },
      { id: 'd7', name: 'Sea Bass à la Plancha' },
    ],
  };

  const getMealDishes = (meal: 'Breakfast' | 'Lunch' | 'Dinner') => {
    return predefinedMap[meal]
      .map(dish => {
        const savedEntry = Object.entries(menuDetails).find(([_, v]) => v.name === dish.name && v.course === meal);
        return {
          id: savedEntry ? savedEntry[0] : dish.id,
          name: dish.name,
          savedData: savedEntry ? savedEntry[1] : null,
        };
      })
      .concat(
        Object.entries(menuDetails)
          .filter(([_, d]) => d.course === meal && !predefinedMap[meal].some(p => p.name === d.name))
          .map(([id, d]) => ({ id, name: d.name, savedData: d }))
      );
  };

  const handleDishSelect = (dish: { id?: string; name: string; savedData?: DishDetails }) => {
    if (dish.savedData) {
      setTempDish(dish.savedData);
      setSelectedDishId(dish.id!);
    } else {
      setTempDish({ name: dish.name, description: '', course: selectedMeal, price: '' });
      setSelectedDishId(dish.id ?? null);
    }
  };

  const addNewDish = () => {
    if (!newDishName.trim()) return;
    const id = Date.now().toString(); // unique id
    setSelectedDishId(id);
    const newDish: DishDetails = { name: newDishName.trim(), description: '', course: selectedMeal, price: '' };
    setTempDish(newDish);
    setMenuDetails(prev => ({ ...prev, [id]: newDish }));
    setNewDishName('');
  };

const saveDish = () => {
  if (!tempDish.name.trim()) return;
  const id = selectedDishId ?? Date.now().toString();
  setMenuDetails(prev => ({ ...prev, [id]: tempDish }));
  setSelectedDishId(null); // <- hide the input form after saving
  setTempDish({ name: '', description: '', course: selectedMeal, price: '' });
};


  return (
    <ImageBackground source={require('./assets/menusscreen.jpg')} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.overlay}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={onBack}><Text style={styles.backText}>‹ Back</Text></TouchableOpacity>
          <Text style={styles.headerTitle}>Menus</Text>
          <View style={{ width: 60 }} />
        </View>

        <ScrollView style={styles.scrollContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
            {['Breakfast', 'Lunch', 'Dinner'].map(meal => (
              <TouchableOpacity
                key={meal}
                onPress={() => { setSelectedMeal(meal as any); setSelectedDishId(null); }}
                style={{ paddingVertical: 6, paddingHorizontal: 12, backgroundColor: selectedMeal === meal ? '#cce5ff' : '#eee', borderRadius: 6 }}
              >
                <Text style={{ fontWeight: '600', color: '#000' }}>{meal}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <FlatList
            data={getMealDishes(selectedMeal)}
            horizontal
            keyExtractor={(item, index) => item.id ?? `${item.name}-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.dishButton, item.id === selectedDishId && styles.selectedDish]}
                onPress={() => handleDishSelect(item)}
              >
                <Text style={styles.dishText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
          />

          <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 8 }]}
              placeholder={`New ${selectedMeal} dish name`}
              placeholderTextColor="#888"
              value={newDishName}
              onChangeText={setNewDishName}
            />
            <Button title="Add" onPress={addNewDish} />
          </View>

{selectedDishId && (
  <View style={styles.formContainer}>
              <Text style={styles.label}>Dish Name</Text>
              <TextInput style={styles.input} value={tempDish.name} onChangeText={text => setTempDish(prev => ({ ...prev, name: text }))} />

              <Text style={styles.label}>Description</Text>
              <TextInput style={styles.input} value={tempDish.description} multiline onChangeText={text => setTempDish(prev => ({ ...prev, description: text }))} />

              <Text style={styles.label}>Course</Text>
              <Picker selectedValue={tempDish.course} style={styles.picker} onValueChange={value => setTempDish(prev => ({ ...prev, course: String(value) }))}>
                {['Breakfast', 'Lunch', 'Dinner'].map(c => <Picker.Item key={c} label={c} value={c} />)}
              </Picker>

              <Text style={styles.label}>Price ($)</Text>
              <TextInput style={styles.input} keyboardType="numeric" value={tempDish.price} onChangeText={text => setTempDish(prev => ({ ...prev, price: text }))} />

              <Button title="Save" onPress={saveDish} />
              </View>
)}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

/*Drinks Screen*/

function DrinksScreen({
  onBack,
  drinkDetails,
  setDrinkDetails,
}: {
  onBack: () => void;
  drinkDetails: Record<string, DrinkDetails>;
  setDrinkDetails: React.Dispatch<React.SetStateAction<Record<string, DrinkDetails>>>;
}) {
  const [selectedDrinkId, setSelectedDrinkId] = useState<string | null>(null);
  const [selectedAppetizerId, setSelectedAppetizerId] = useState<string | null>(null);
  const [newDrinkName, setNewDrinkName] = useState('');
  const [newAppetizerName, setNewAppetizerName] = useState('');
  const [tempDrink, setTempDrink] = useState<DrinkDetails>({ name: '', description: '', price: '' });
  const [tempAppetizer, setTempAppetizer] = useState<DrinkDetails>({ name: '', description: '', price: '' });

const drinksToShow = predefinedDrinks.map(d => {
  const saved = Object.entries(drinkDetails).find(([_, dd]) => dd.name === d.name);
  return {
    id: saved ? saved[0] : d.id,
    name: d.name,
    savedData: saved ? saved[1] : undefined,
  };
});

const appetizersToShow = predefinedAppetizers.map(a => {
  const saved = Object.entries(drinkDetails).find(([_, dd]) => dd.name === a.name);
  return {
    id: saved ? saved[0] : a.id,
    name: a.name,
    savedData: saved ? saved[1] : undefined,
  };
});

  const handleSelect = (id: string, name: string, type: 'drink' | 'appetizer') => {
    if (type === 'drink') {
      setSelectedDrinkId(id);
      setSelectedAppetizerId(null);
      setTempDrink(drinkDetails[id] ?? { name, description: '', price: '' });
    } else {
      setSelectedAppetizerId(id);
      setSelectedDrinkId(null);
      setTempAppetizer(drinkDetails[id] ?? { name, description: '', price: '' });
    }
  };

  const addNewItem = (name: string, type: 'drink' | 'appetizer') => {
    if (!name.trim()) return;
    const id = Date.now().toString();
    if (type === 'drink') {
      setSelectedDrinkId(id);
      setSelectedAppetizerId(null);
      const newItem = { name: name.trim(), description: '', price: '' };
      setTempDrink(newItem);
      setDrinkDetails(prev => ({ ...prev, [id]: newItem }));
      setNewDrinkName('');
    } else {
      setSelectedAppetizerId(id);
      setSelectedDrinkId(null);
      const newItem = { name: name.trim(), description: '', price: '' };
      setTempAppetizer(newItem);
      setDrinkDetails(prev => ({ ...prev, [id]: newItem }));
      setNewAppetizerName('');
    }
  };

  const saveItem = (type: 'drink' | 'appetizer') => {
  if (type === 'drink' && selectedDrinkId) {
    setDrinkDetails(prev => ({ ...prev, [selectedDrinkId]: tempDrink }));
    setSelectedDrinkId(null); // <- hide the drink form after saving
    setTempDrink({ name: '', description: '', price: '' }); // optional: clear temp fields
  } else if (type === 'appetizer' && selectedAppetizerId) {
    setDrinkDetails(prev => ({ ...prev, [selectedAppetizerId]: tempAppetizer }));
    setSelectedAppetizerId(null); // <- hide the appetizer form after saving
    setTempAppetizer({ name: '', description: '', price: '' });
  }
};

  return (
    <ImageBackground source={require('./assets/drinksappetizers.jpg')} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.overlay}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={onBack}><Text style={styles.backText}>‹ Back</Text></TouchableOpacity>
          <Text style={styles.headerTitle}>Drinks & Appetizers</Text>
          <View style={{ width: 60 }} />
        </View>

        <ScrollView style={styles.scrollContainer}>
          {/* Drinks Section */}
          <Text style={styles.subTitle}>Drinks</Text>
          <FlatList
            data={drinksToShow}
            horizontal
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.dishButton, item.id === selectedDrinkId && styles.selectedDish]}
                onPress={() => handleSelect(item.id, item.name, 'drink')}
              >
                <Text style={styles.dishText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <View style={{ flexDirection: 'row', marginTop: 8, alignItems: 'center' }}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 8 }]}
              placeholder="New drink name"
              placeholderTextColor="#888"
              value={newDrinkName}
              onChangeText={setNewDrinkName}
            />
            <Button title="Add" onPress={() => addNewItem(newDrinkName, 'drink')} />
          </View>
          {selectedDrinkId && (
            <View style={styles.formContainer}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={tempDrink.name}
                onChangeText={text => setTempDrink(prev => ({ ...prev, name: text }))}
              />
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.input}
                value={tempDrink.description}
                onChangeText={text => setTempDrink(prev => ({ ...prev, description: text }))}
                multiline
              />
              <Text style={styles.label}>Price ($)</Text>
              <TextInput
                style={styles.input}
                value={tempDrink.price}
                onChangeText={text => setTempDrink(prev => ({ ...prev, price: text }))}
                keyboardType="numeric"
              />
              <Button title="Save" onPress={() => saveItem('drink')} />
            </View>
          )}

          {/* Appetizers Section */}
          <Text style={[styles.subTitle, { marginTop: 20 }]}>Appetizers</Text>
          <FlatList
            data={appetizersToShow}
            horizontal
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.dishButton, item.id === selectedAppetizerId && styles.selectedDish]}
                onPress={() => handleSelect(item.id, item.name, 'appetizer')}
              >
                <Text style={styles.dishText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <View style={{ flexDirection: 'row', marginTop: 8, alignItems: 'center' }}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 8 }]}
              placeholder="New appetizer name"
              placeholderTextColor="#888"
              value={newAppetizerName}
              onChangeText={setNewAppetizerName}
            />
            <Button title="Add" onPress={() => addNewItem(newAppetizerName, 'appetizer')} />
          </View>
          {selectedAppetizerId && (
            <View style={styles.formContainer}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={tempAppetizer.name}
                onChangeText={text => setTempAppetizer(prev => ({ ...prev, name: text }))}
              />
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.input}
                value={tempAppetizer.description}
                onChangeText={text => setTempAppetizer(prev => ({ ...prev, description: text }))}
                multiline
              />
              <Text style={styles.label}>Price ($)</Text>
              <TextInput
                style={styles.input}
                value={tempAppetizer.price}
                onChangeText={text => setTempAppetizer(prev => ({ ...prev, price: text }))}
                keyboardType="numeric"
              />
              <Button title="Save" onPress={() => saveItem('appetizer')} />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}



/*Bookings Screen*/

function BookingsScreen({ onBack }: { onBack: () => void }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newPeople, setNewPeople] = useState('');

  const addBooking = () => {
    if (!newName.trim() || !newPhone.trim() || !newDate.trim() || !newPeople.trim()) return;
    const newBooking: Booking = { 
      id: Date.now().toString(), 
      name: newName.trim(), 
      phone: newPhone.trim(),
      date: newDate.trim(), 
      people: newPeople.trim() 
    };
    setBookings(prev => [...prev, newBooking]);
    setNewName(''); setNewPhone(''); setNewDate(''); setNewPeople('');
  };

  return (
    <ImageBackground source={require('./assets/homebackground.jpg')} style={styles.background} resizeMode="cover">
      <SafeAreaView style={styles.overlay}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={onBack}><Text style={styles.backText}>‹ Back</Text></TouchableOpacity>
          <Text style={styles.headerTitle}>Bookings</Text>
          <View style={{ width: 60 }} />
        </View>

        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.subTitle}>Add New Booking:</Text>
          <Text style={styles.label}>Name</Text>
          <TextInput style={styles.input} placeholder="Customer Name" placeholderTextColor="#888" value={newName} onChangeText={setNewName} />
          <Text style={styles.label}>Phone Number</Text>
          <TextInput style={styles.input} placeholder="Phone Number" placeholderTextColor="#888" value={newPhone} onChangeText={setNewPhone} keyboardType="phone-pad" />
          <Text style={styles.label}>Date of Arrival</Text>
          <TextInput style={styles.input} placeholder="YYYY-MM-DD" placeholderTextColor="#888" value={newDate} onChangeText={setNewDate} />
          <Text style={styles.label}>Number of People</Text>
          <TextInput style={styles.input} placeholder="Number of people" placeholderTextColor="#888" value={newPeople} onChangeText={setNewPeople} keyboardType="numeric" />
          <Button title="Add Booking" onPress={addBooking} />

          <Text style={[styles.subTitle, { marginTop: 24 }]}>Existing Bookings:</Text>
          {bookings.length === 0 ? <Text style={styles.emptyText}>No bookings yet.</Text> :
            bookings.map(b => (
              <View key={b.id} style={styles.menuItem}>
                <Text style={styles.menuItemTitle}>{b.name}</Text>
                <Text style={styles.menuItemSubtitle}>Phone: {b.phone}</Text>
                <Text style={styles.menuItemSubtitle}>Date: {b.date}</Text>
                <Text style={styles.menuItemSubtitle}>People: {b.people}</Text>
              </View>
            ))
          }
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

/*App Root*/

export default function App() {
  const [screen, setScreen] = useState<Screen>('Home');
  const [menuDetails, setMenuDetails] = useState<Record<string, DishDetails>>({});
  const [drinkDetails, setDrinkDetails] = useState<Record<string, DrinkDetails>>({});

 if (screen === 'Home') 
  return (
    <HomeScreen
      onNavigate={s => setScreen(s)}
      menuDetails={menuDetails}
      drinkDetails={drinkDetails}
      setMenuDetails={setMenuDetails}
      setDrinkDetails={setDrinkDetails}
    />
  );

  if (screen === 'Menus') 
    return <MenusScreen onBack={() => setScreen('Home')} menuDetails={menuDetails} setMenuDetails={setMenuDetails} />;
  
  if (screen === 'Drinks') 
    return <DrinksScreen onBack={() => setScreen('Home')} drinkDetails={drinkDetails} setDrinkDetails={setDrinkDetails} />;
  
  return <BookingsScreen onBack={() => setScreen('Home')} />;
}


/*Styles*/

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  overlay: { backgroundColor: 'rgba(0,0,0,0.6)', flex: 1, padding: 12 },
  centerContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
  scrollContainer: { flex: 1, paddingHorizontal: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, color: '#fff', textAlign: 'center' },
  subTitle: { fontSize: 18, marginBottom: 10, color: '#ddd' },
  emptyText: { color: '#ccc', marginTop: 8 },
  homeMenuContainer: { width: '100%', alignItems: 'center' },
  menuButton: { width: '90%', backgroundColor: '#fff', paddingVertical: 14, borderRadius: 8, marginVertical: 8, alignItems: 'center', elevation: 2 },
  menuButtonText: { color: '#000', fontSize: 16, fontWeight: '600' },
  menuItem: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 12 },
  menuItemTitle: { fontSize: 16, fontWeight: '700', color: '#000' },
  menuItemSubtitle: { fontSize: 13, color: '#333', marginTop: 6 },
  menuItemPrice: { marginTop: 8, color: '#333', fontWeight: '600' },
  dishButton: { backgroundColor: '#eee', padding: 10, marginRight: 10, borderRadius: 6 },
  selectedDish: { backgroundColor: '#cce5ff' },
  dishText: { fontSize: 16, color: '#000' },
  formContainer: { marginTop: 20, paddingHorizontal: 12 },
  label: { fontSize: 16, marginTop: 10, color: '#fff' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginTop: 5, backgroundColor: '#fff', color: '#000' },
  picker: { height: 50, width: '100%', marginTop: 5, backgroundColor: '#fff' },
  headerRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 6, paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#333' },
  backText: { color: '#4da6ff', fontSize: 18, width: 60 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '600', color: '#fff' },
});
