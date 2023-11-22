/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});
Scenario('showing empty liked food', ({ I }) => {
  I.seeElement('.kosong');
  I.see('Tidak Ada Restaurant Yang Disukai', '.kosong');
});
Scenario('liking one Restaurant', async ({ I }) => {
  I.see('Tidak Ada Restaurant Yang Disukai', '.kosong');

  I.amOnPage('/');

  I.seeElement('.name');
  const firstMovie = locate('.name').first();
  const firstMovieTitle = await I.grabTextFrom(firstMovie);
  I.click(firstMovie);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.title_restaurant');
  const likedMovieTitle = await I.grabTextFrom('.title_restaurant');

  assert.strictEqual(firstMovieTitle, likedMovieTitle);
});
Scenario('Unliking a Restaurant', async ({ I }) => {
  I.amOnPage('/');

  I.seeElement('.name');
  const firstMovie = locate('.name').first();
  const firstMovieTitle = await I.grabTextFrom(firstMovie);
  I.click(firstMovie);
  I.seeElement('.fa');
  I.click('.fa');

  I.amOnPage('/#/favorite');
  I.seeElement('.title_restaurant');
  const likedMovieTitle = await I.grabTextFrom('.title_restaurant');
  assert.strictEqual(firstMovieTitle, likedMovieTitle);

  I.seeElement('.name');
  I.click('.name');
  I.seeElement('.fa');
  I.click('.fa');
  I.amOnPage('/#/favorite');
  I.see('Tidak Ada Restaurant Yang Disukai', '.kosong');
});
