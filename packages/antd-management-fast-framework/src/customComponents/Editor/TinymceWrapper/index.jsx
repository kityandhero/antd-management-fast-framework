import React, { PureComponent } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import { corsTarget, isFunction } from '../../../utils/tools';
import { pretreatmentRemoteSingleData } from '../../../utils/requestAssistor';
import { getTokenKeyName, getToken } from '../../../utils/globalStorageAssist';
import { defaultSettingsLayoutCustom } from '../../../utils/defaultSettingsSpecial';

class TinymceWrapper extends PureComponent {
  editor = React.createRef();

  buildConfig = () => {
    const { initConfig } = this.props;

    var useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const config = {
      ...{
        language: 'zh_CN',
        height: 600,
        plugins_ignore:
          'tinydrive powerpaste imagetools advcode formatpainter pageembed permanentpen casechange checklist advtable export tinymcespellchecker linkchecker mentions tinycomments toc',
        plugins:
          'print preview  importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount a11ychecker textpattern noneditable help charmap quickbars  emoticons',
        mobile: {
          plugins:
            'print preview importcss tinydrive searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount a11ychecker textpattern noneditable help charmap quickbars  emoticons',
        },
        menu: {
          tc: {
            title: 'Comments',
            items: 'addcomment showcomments deleteallconversations',
          },
        },
        menubar: 'file edit view insert format tools table tc help',
        toolbar:
          'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor  removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
        autosave_ask_before_unload: true,
        autosave_interval: '30s',
        autosave_prefix: '{path}{query}-{id}-',
        autosave_restore_when_empty: false,
        autosave_retention: '2m',
        image_advtab: true,
        // link_list: [],
        // image_list: [],
        // 启用image_class_list 配置后,该值不能为空数组，否则将发生错误
        // image_class_list: ['image'],
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
        // spellchecker_ignore_list: ['Ephox', 'Moxiecode'],
        // tinycomments_mode: 'embedded',
        content_style: '.mymention{ color: gray; }',
        contextmenu_ignore: 'imagetools configurepermanentpen',
        contextmenu: 'link image table',
        a11y_advanced_options: true,
        skin: useDarkMode ? 'oxide-dark' : 'oxide',
        content_css: useDarkMode ? 'dark' : 'default',
        // mentions_selector: '.mymention',
        // mentions_item_type: 'profile',
        automatic_uploads: true,
        images_upload_url: '',
        images_upload_handler: this.imageUploadHandler,
      },
      ...(initConfig || {}),
    };

    return config;
  };

  imageUploadHandler = (blobInfo, success, failure, progress) => {
    const { imagesUploadUrl } = this.props;
    const corsUrl = corsTarget();

    const images_upload_url = `${corsUrl}${imagesUploadUrl}`;

    var xhr, formData;

    xhr = new XMLHttpRequest();

    xhr.withCredentials = false;
    xhr.open('POST', images_upload_url);

    xhr.setRequestHeader(getTokenKeyName(), getToken() || 'anonymous');

    xhr.upload.onprogress = function (e) {
      progress((e.loaded / e.total) * 100);
    };

    xhr.onload = function () {
      if (xhr.status === 403) {
        failure('HTTP Error: ' + xhr.status, { remove: true });
        return;
      }

      if (xhr.status < 200 || xhr.status >= 300) {
        failure('HTTP Error: ' + xhr.status);
        return;
      }

      const v = pretreatmentRemoteSingleData(JSON.parse(xhr.responseText));

      const { dataSuccess } = v;

      if (!dataSuccess) {
        failure(
          `图片上传失败，请确认上传地址有效可用,当前上传地址为: ${images_upload_url}`,
        );

        return;
      }

      const {
        data: { imageUrl },
      } = v;

      success(imageUrl || '');
    };

    xhr.onerror = function () {
      failure('图片上传失败，请确认上传地址有效可用. Code: ' + xhr.status);
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
    const { apiKey, content } = this.props;

    return (
      <div
        style={{
          border: '0px solid #ccc',
        }}
      >
        <Editor
          apiKey={apiKey}
          onInit={(evt, editor) => (this.editor.current = editor)}
          initialValue={content}
          init={this.buildConfig()}
          onEditorChange={this.handleEditorChange}
        />
      </div>
    );
  }
}

TinymceWrapper.defaultProps = {
  apiKey: defaultSettingsLayoutCustom.getTinymceApiKey(),
  content: '',
  initConfig: null,
  imagesUploadUrl: defaultSettingsLayoutCustom.getTinymceImagesUploadUrl(),
};

export default TinymceWrapper;
