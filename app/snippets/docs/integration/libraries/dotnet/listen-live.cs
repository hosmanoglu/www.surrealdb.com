await using var liveQuery = db.ListenLive<Person>(queryUuid);

// Option 1
// Consume the live query via an IAsyncEnumerable, 
// blocking the current thread until the query is killed.
await foreach (var response in liveQuery)
{
    // Either a Create, Update, Delete or Close response...
}

// ------------------------------

// Option 2
// Consume the live query via an Observable.
liveQuery
    .ToObservable()
    .Subscribe(() => 
    {
        // Either a Create, Update, Delete or Close response...
    });