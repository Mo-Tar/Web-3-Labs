const express = require('express'); 
const supa = require('@supabase/supabase-js'); 
const app = express(); 
 
const supaUrl = 'https://sykvrnakfzcdyxouoirm.supabase.co'; 
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5a3ZybmFrZnpjZHl4b3VvaXJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg4MTgyMTksImV4cCI6MjAyNDM5NDIxOX0.DFhQcpwyzaVZYQZWksgO7AsvSdQwyTVt7-Q7t3y9Csk';

const supabase = supa.createClient(supaUrl, supaAnonKey);


app.get('/f1/qualifying/:race', async (req, res) => {
  const {data, error} = await supabase
  .from('qualifying')
  .select('qualifyId, position, q1, q2, q3, races (name,year),drivers (surname,forename),constructors (name)')
  .eq('raceId',req.params.race)
  .order('position',{ ascending: true });

  if (error) {
      console.error('Error fetching data:', error.message);
      return;
  }

  res.send(data);
});

app.get('/f1/races/:range1/:range2', async (req, res) => {
  const { data, error } = await supabase
    .from('races')
    .select()
    .gte('year', req.params.range1)
    .lte('year', req.params.range2)
    .order('year', { ascending: true });
  
    if (error) {
      console.error('Error fetching data:', error.message);
      return;
  }
  res.send(data);
});

app.get('/f1/drivers/name/:text/limit/:num', async (req, res) => {
  const { data, error } = await supabase
    .from('drivers')
    .select()
    .ilike('surname', `${req.params.text}%`)
    .limit(req.params.num)
    .order('surname', { ascending: true });
  
    if (error) {
      console.error('Error fetching data:', error.message);
      return;
  }
  res.send(data);
});


app.listen(8080, () => { 
  console.log('listening on port 8080'); 
  console.log('http://localhost:8080/f1/qualifying/1034')
  console.log('http://localhost:8080/f1/races/2020/2022')
  console.log('http://localhost:8080/f1/drivers/name/sch/limit/12')
 }); 