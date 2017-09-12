import { SampleHelloWorldPage } from './app.po';

describe('sample-hello-world App', () => {
  let page: SampleHelloWorldPage;

  beforeEach(() => {
    page = new SampleHelloWorldPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
