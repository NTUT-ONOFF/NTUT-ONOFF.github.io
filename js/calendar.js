const ics_file_url = 'https://outlook.office365.com/owa/calendar/276483ab2fa2402694edcf0328d98c55@a.tsukuba-tech.ac.jp/3efb4fb2a8704b3bb17d0efe9c84e0ab1784756408962624547/calendar.ics';
fetch(ics_file_url).then(response => response.text())
  .then(data => {
    const jcalData = ICAL.parse(data);
    const comp = new ICAL.Component(jcalData);
    const events = comp.getAllSubcomponents('vevent');

    events.forEach(event => {
      const summary = event.getFirstPropertyValue('summary');
      const startDate = event.getFirstPropertyValue('dtstart').toJSDate().toLocaleDateString();
      const endDate = event.getFirstPropertyValue('dtend').toJSDate().toLocaleDateString();

      // HTMLに追加するための要素を作成
      const eventElement = document.createElement('div');
      eventElement.innerHTML = `<h3>${summary}</h3><p>Start: ${startDate}</p><p>End: ${endDate}</p>`;

      // 既存の要素に追加
      document.body.appendChild(eventElement);
    });
  })
  .catch(error => console.error('Error:', error));
