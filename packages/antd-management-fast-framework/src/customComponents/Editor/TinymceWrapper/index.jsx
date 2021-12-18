import React, { PureComponent } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import { corsTarget, isFunction } from '../../../utils/tools';
import { getTokenKeyName, getToken } from '../../../utils/globalStorageAssist';
import { defaultSettingsLayoutCustom } from '../../../utils/defaultSettingsSpecial';

class TinymceWrapper extends PureComponent {
  imagesUploadUrl = '';

  editor = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      initContent: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { initContent: contentPrev } = prevState;
    const { content: contentNext } = nextProps;

    if (contentPrev !== contentNext) {
      return {
        initContent: contentNext,
      };
    }

    return {};
  }

  imageUploadHandler = (blobInfo, success, failure, progress) => {
    var xhr, formData;

    xhr = new XMLHttpRequest();

    xhr.withCredentials = false;
    xhr.open('POST', this.imagesUploadUrl);

    xhr.setRequestHeader(getTokenKeyName(), getToken() || 'anonymous');

    xhr.upload.onprogress = function (e) {
      progress((e.loaded / e.total) * 100);
    };

    xhr.onload = function () {
      var json;

      if (xhr.status === 403) {
        failure('HTTP Error: ' + xhr.status, { remove: true });
        return;
      }

      if (xhr.status < 200 || xhr.status >= 300) {
        failure('HTTP Error: ' + xhr.status);
        return;
      }

      json = JSON.parse(xhr.responseText);

      if (!json || typeof json.location != 'string') {
        failure('Invalid JSON: ' + xhr.responseText);
        return;
      }

      success(json.location);
    };

    xhr.onerror = function () {
      failure(
        'Image upload failed due to a XHR Transport error. Code: ' + xhr.status,
      );
    };

    formData = new FormData();
    formData.append('file', blobInfo.blob(), blobInfo.filename());

    xhr.send(formData);
  };

  handleEditorChange = (newValue, editor) => {
    const { afterChange } = this.props;

    if (isFunction(afterChange)) {
      afterChange({
        html: editor.getContent(),
        text: editor.getContent({ format: 'text' }),
      });
    }
  };

  render() {
    const { initContent } = this.state;

    const corsUrl = corsTarget();

    const initConfig = {
      ...{
        language: 'zh_CN',
        height: 600,
        plugins_ignore: 'tinydrive imagetools toc',
        plugins:
          'print preview powerpaste casechange importcss searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker textpattern noneditable help formatpainter permanentpen pageembed charmap tinycomments mentions quickbars linkchecker emoticons advtable export',
        mobile: {
          plugins:
            'print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker textpattern noneditable help formatpainter pageembed charmap mentions quickbars linkchecker emoticons advtable',
        },
        menu: {
          tc: {
            title: 'Comments',
            items: 'addcomment showcomments deleteallconversations',
          },
        },
        menubar: 'file edit view insert format tools table tc help',
        toolbar:
          'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
        autosave_ask_before_unload: true,
        autosave_interval: '30s',
        autosave_prefix: '{path}{query}-{id}-',
        autosave_restore_when_empty: false,
        autosave_retention: '2m',
        image_advtab: true,
        link_list: [],
        image_list: [],
        image_class_list: [],
        importcss_append: true,
        templates: [
          {
            title: '新建表格',
            description: 'creates a new table',
            content:
              '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
          },
          {
            title: 'Starting my story',
            description: 'A cure for writers block',
            content: 'Once upon a time...',
          },
          {
            title: '附带日期的清单',
            description: '附带日期的清单',
            content:
              '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
          },
        ],
        template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
        template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
        image_caption: true,
        quickbars_selection_toolbar:
          'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
        noneditable_noneditable_class: 'mceNonEditable',
        toolbar_mode: 'sliding',
        spellchecker_ignore_list: ['Ephox', 'Moxiecode'],
        tinycomments_mode: 'embedded',
        content_style: '.mymention{ color: gray; }',
        contextmenu_ignore: 'imagetools',
        contextmenu: 'link image table configurepermanentpen',
        a11y_advanced_options: true,
        skin: useDarkMode ? 'oxide-dark' : 'oxide',
        content_css: useDarkMode ? 'dark' : 'default',
        mentions_selector: '.mymention',
        mentions_item_type: 'profile',
        images_upload_url: '',
        images_upload_handler: this.imageUploadHandler,
      },
      ...(defaultSettingsLayoutCustom.getTinymceConfig() || {}),
    };

    initConfig.images_upload_url = `${corsUrl}${initConfig.images_upload_url}`;

    this.imagesUploadUrl = initConfig.images_upload_url;

    return (
      <div
        style={{
          border: '0px solid #ccc',
        }}
      >
        <Editor
          apiKey={defaultSettingsLayoutCustom.getTinymceApiKey()}
          onInit={(evt, editor) => (this.editor.current = editor)}
          initialValue={initContent}
          init={initConfig}
          onEditorChange={this.handleEditorChange}
        />
      </div>
    );
  }
}

TinymceWrapper.defaultProps = {
  content: '',
};

export default TinymceWrapper;
