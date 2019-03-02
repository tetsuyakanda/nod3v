package createhtml;

import builder.Builder;
import logvis.SrcFiles.SrcFile;

public class Director {

	private Builder builder;
	private static final String OUTPUTDIR="sample/output/";
	private static final String META="<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />";
	//TODO JSとCSSのパス指定
	private static final String[] JSs= {"../../resources/test.js",};
	private final String CSS = "../../resources/custom.css";


	// 実際はBuilderのサブクラスを引数に取る
	public Director(Builder builder) {
		this.builder = builder;
	}

	// 文章の中身を作る
	public void construct(SrcFile file) {
		builder.makeHead(META);
		builder.makeTitle(file.getFilename()+".java");
		for(String js: JSs) {
			builder.makeJavaScript(js);
		}
		builder.makeStyle(CSS);
		builder.makeBody(file.getFilename()+".java");
		builder.makeHeading("今日の目標");
		int index=0;
		for(String line: file.getLines()) {

			builder.makeContents(Integer.toString(++index) +": "+  line);
		}
		builder.makeHeading("使うもの");
		builder.makeContents("Java言語で学ぶデザインパターン入門");

		testadd();
		builder.makeContents("Java言語で学ぶデザインパターン入門");
		// TODO 出力先の指定
		//builder.close();
		builder.close(OUTPUTDIR);
	}

	private void testadd() {
String line="      <select id=\"sample\" name=\"nanika\">"+
		"<option> - - - - </option>"
		+ "</select>歳\r\n"
		+ "<script>addOption()</script>";


		builder.makeScript(line);

	}
}