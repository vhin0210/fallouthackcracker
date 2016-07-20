import { FallouthackcrackerPage } from './app.po';

describe('fallouthackcracker App', function() {
  let page: FallouthackcrackerPage;

  beforeEach(() => {
    page = new FallouthackcrackerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
